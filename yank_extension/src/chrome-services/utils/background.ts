import supabase from "@/api/supabaseClient";
import { User } from "@supabase/supabase-js";

interface HighlightedText {
	text: string;
	color: string;
}

interface GeneralResponse {
	status: number;
	message: string;
}

interface GetPreviewResponse {
	status: number;
	data?: HighlightedText | null;
	message?: string;
}

interface AuthResponse {
	status: number;
	user?: User | null;
	error?: string;
}

type Message =
	| { action: "storeHighlightedText"; data: HighlightedText }
	| { action: "getHighlightedText" }
	| { action: "toggleHighlighter"; data: boolean }
	| { action: "signInWithGoogle" }
	| { action: "SET_SIGNING_IN"; value: boolean };

let storedHighlightedText: HighlightedText | null = null;
let isSigningIn = false;
// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension installed");
});

chrome.runtime.onInstalled.addListener(() => {
	// Initialize `fetchedTexts` and `lastCleanedAt` if not already present
	chrome.storage.local.get(["fetchedTexts", "lastCleanedAt"], (result) => {
		if (!result.fetched?.length) {
			chrome.storage.local.set({ fetchedTexts: [] }, () => {
				console.log("Initialized fetchedTexts to an empty array.");
			});
		}

		console.log(result.lastCleanedAt);
		if (!result.lastCleanedAt) {
			const now = Date.now();
			chrome.storage.local.set({ lastCleanedAt: now }, () => {
				console.log(
					"Initialized lastCleanedAt to:",
					new Date(now).toISOString(),
				);
			});
		}
	});

	// Initialize `cachedResponses` if not already present
	chrome.storage.local.get("cachedResponses", (result) => {
		if (!result.cachedResponses || typeof result.cachedResponses !== "object") {
			chrome.storage.local.set({ cachedResponses: {} }, () => {
				console.log("Initialized cachedResponses as an empty dictionary.");
			});
		} else {
			// Perform cleanup of cached responses
			cleanupCachedResponses(result.cachedResponses);
		}
	});

	console.log("Extension installed");

	// Set up periodic cleanup every 12 hours
	setupPeriodicCleanup();
});

export type CachedResponses = Record<
	string,
	{ text: string; timestamp: number }
>;

// Cleanup function to remove cached items older than 48 hours
const cleanupCachedResponses = (cachedResponses: CachedResponses): void => {
	const now = Date.now();
	const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
	const updatedCachedResponses: CachedResponses = {};

	// Iterate through cachedResponses and keep only fresh items
	for (const [key, value] of Object.entries(cachedResponses)) {
		if (value.timestamp && now - value.timestamp <= FORTY_EIGHT_HOURS) {
			updatedCachedResponses[key] = value;
		}
	}

	// Update storage with the cleaned responses
	chrome.storage.local.set({ cachedResponses: updatedCachedResponses }, () => {
		console.log("Cleaned up old cached responses.");
	});
};

// Function to set up periodic cleanup
const setupPeriodicCleanup = () => {
	const TWELVE_HOURS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

	// Use setInterval to trigger cleanup every 12 hours
	setInterval(() => {
		chrome.storage.local.get("cachedResponses", (result) => {
			if (
				result.cachedResponses &&
				typeof result.cachedResponses === "object"
			) {
				cleanupCachedResponses(result.cachedResponses);
			}
		});
	}, TWELVE_HOURS);

	console.log("Periodic cleanup set up to run every 12 hours.");
};

chrome.runtime.onMessage.addListener(
	(
		message: Message,
		_sender: chrome.runtime.MessageSender,
		sendResponse: (
			response?: GeneralResponse | GetPreviewResponse | AuthResponse,
		) => void,
	): boolean | void => {
		if (message.action === "SET_SIGNING_IN") {
			isSigningIn = message.value;
			sendResponse({ status: 200, message: "Success" });
		}
		if (message.action == "storeHighlightedText") {
			storedHighlightedText = message.data;
			if (storedHighlightedText != null) {
				sendResponse({ status: 200, message: "Success" });
			} else {
				sendResponse({
					status: 500,
					message: "Failed to store highlighted text. Check if text is null",
				});
			}
		} else if (message.action === "getHighlightedText") {
			if (storedHighlightedText !== null) {
				// Respond with the stored highlighted text and status 200
				sendResponse({ status: 200, data: storedHighlightedText });
			} else {
				// Respond with status 404 and error message
				sendResponse({
					status: 404,
					message: "No highlighted text found",
				});
			}
		} else if (message.action === "toggleHighlighter") {
			if (message.data !== null) {
				toggleHighlighterSwitch(message.data);
				sendResponse({ status: 200, message: "Success" });
			} else {
				sendResponse({
					status: 404,
					message: "No highlighted text found",
				});
			}
		}
	},
);

function toggleHighlighterSwitch(newState: boolean) {
	// Retrieve the current state first
	chrome.storage.sync.get("isHighlighterEnabled", (result) => {
		// Only write if the state has changed
		if (result.isHighlighterEnabled !== newState) {
			chrome.storage.sync.set({ isHighlighterEnabled: newState });
			console.log("Highlighter state updated:", newState);
		} else {
			console.log(
				"Highlighter state is already",
				newState,
				"— no need to update.",
			);
		}
	});
}

// add tab listener when background script starts
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	if (!isSigningIn) return;
	if (changeInfo.url) {
		const url = new URL(changeInfo.url);
		const params = new URLSearchParams(url.hash.substring(1));

		// Validate required parameters
		const accessToken = params.get("access_token");
		const refreshToken = params.get("refresh_token");

		if (accessToken && refreshToken) {
			finishUserOAuth(changeInfo.url);
		} else {
			console.error("URL is missing required tokens:", {
				accessToken,
				refreshToken,
			});
		}
	}
});

/**
 * Method used to finish OAuth callback for a user authentication.
 */
async function finishUserOAuth(url: string) {
	try {
		console.log(`Handling user OAuth callback...`);
		// Extract tokens from the URL hash
		const hashMap = parseUrlHash(url);
		const access_token = hashMap.get("access_token");
		const refresh_token = hashMap.get("refresh_token");
		if (!access_token || !refresh_token) {
			throw new Error("No Supabase tokens found in URL hash");
		}

		// Set Supabase session
		const { data, error } = await supabase.auth.setSession({
			access_token,
			refresh_token,
		});
		if (error) throw error;

		// Persist session to storage
		await chrome.storage.local.set({ session: data.session });

		// sending the sessino to the OAuth Context
		chrome.runtime.sendMessage(
			{ action: "SET_SESSION", value: data.session },
			(response) => {
				if (chrome.runtime.lastError) {
					console.error(
						"Error sending message to OAuth Context:",
						chrome.runtime.lastError,
					);
				} else {
					console.log("OAuth Context acknowledged sign-in state:", response);
				}
			},
		);

		// Redirect to post-auth page
		chrome.tabs.update({ url: "https://www.yank.studio/auth/post-login" });
		console.log("OAuth callback handled successfully");
	} catch (error) {
		console.error("Error handling OAuth callback:", error);
	}
}

/**
 * Helper method used to parse the hash of a redirect URL.
 */
function parseUrlHash(url: string) {
	const hashParts = new URL(url).hash.slice(1).split("&");
	const hashMap = new Map(
		hashParts.map((part) => {
			const [name, value] = part.split("=");
			return [name, value];
		}),
	);

	return hashMap;
}
export {};
