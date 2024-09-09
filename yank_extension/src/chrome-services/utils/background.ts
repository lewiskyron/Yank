// background.ts

console.log("Background script loaded");

// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension installed");
});

// Export an empty object to make this a module
export {};
