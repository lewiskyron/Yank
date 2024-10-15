console.log("Background script loaded");

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

type Message =
	| { action: "storeHighlightedText"; data: HighlightedText }
	| { action: "getHighlightedText" }
	| { action: "toggleHighlighter"; data: boolean };

let storedHighlightedText: HighlightedText | null = null;
// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension installed");
});

chrome.runtime.onMessage.addListener(
	(
		message: Message,
		_sender: chrome.runtime.MessageSender,
		sendResponse: (response?: GeneralResponse | GetPreviewResponse) => void,
	): void => {
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
				sendResponse({ status: 404, message: "No highlighted text found" });
			}
		} else if (message.action === "toggleHighlighter") {
			if (message.data !== null) {
				toggleHighlighterSwitch(message.data);
				sendResponse({ status: 200, message: "Success" });
			} else {
				sendResponse({ status: 404, message: "No highlighted text found" });
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

// Export an empty object to make this a module
export {};
