console.log("Background script loaded");

interface HighlightedText {
	text: string;
	color: string;
}

interface StoreHighlightResponse {
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
	| { action: "getHighlightedText" };

let storedHighlightedText: HighlightedText | null = null;

// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension installed");
});

chrome.runtime.onMessage.addListener(
	(
		message: Message,
		_sender: chrome.runtime.MessageSender,
		sendResponse: (
			response?: StoreHighlightResponse | GetPreviewResponse,
		) => void,
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
		}
	},
);

// Export an empty object to make this a module
export {};
