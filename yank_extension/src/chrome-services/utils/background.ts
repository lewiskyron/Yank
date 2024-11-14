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

interface AuthResponse{
	status: number;
	user?: User | null;
	error?: string;
}

type Message =
	| { action: "storeHighlightedText"; data: HighlightedText }
	| { action: "getHighlightedText" }
	| { action: "toggleHighlighter"; data: boolean }
	| {action: "signInWithGoogle"};


let storedHighlightedText: HighlightedText | null = null;
// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension installed");
});

chrome.runtime.onMessage.addListener(
	(
		message: Message,
		_sender: chrome.runtime.MessageSender,
		sendResponse: (response?: GeneralResponse | GetPreviewResponse | AuthResponse) => void,
	): boolean | void => {

		if(message.action === "signInWithGoogle"){
			handleGoogleSignIn(sendResponse);
			return true;
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

const manifest = chrome.runtime.getManifest();
async function handleGoogleSignIn(sendResponse: (response: AuthResponse) => void) {
  try {
    const url = new URL('https://accounts.google.com/o/oauth2/auth');
    url.searchParams.set('client_id', manifest.oauth2!.client_id);
	console.log(manifest.oauth2!.client_id);
    url.searchParams.set('response_type', 'id_token');
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('redirect_uri', `https://${chrome.runtime.id}.chromiumapp.org`);
	console.log(chrome.identity.getRedirectURL());

	if(manifest.oauth2?.scopes){
		url.searchParams.set('scope', manifest.oauth2?.scopes.join(' '));
	}

    chrome.identity.launchWebAuthFlow(
      {
        url: url.href,
        interactive: true,
      },
      async (redirectedTo) => {
        if (chrome.runtime.lastError || !redirectedTo) {
          sendResponse({ 
            status: 500, 
            error: chrome.runtime.lastError?.message || 'Authentication failed' 
          });
          return;
        }

        try {
          const url = new URL(redirectedTo);
          const params = new URLSearchParams(url.hash.replace('#', ''))
          const idToken = params.get('id_token');

          if (!idToken) {
            throw new Error('No ID token received');
          }

          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken,
          });

          if (error) throw error;
          
          sendResponse({ status: 200, user: data.user });
        } catch (error) {
          sendResponse({ 
            status: 500, 
            error: error instanceof Error ? error.message : 'Failed to sign in with ID token' 
          });
        }
      }
    );
  } catch (error) {
    sendResponse({ status: 500, error: (error as Error).message });
  }
}

// Export an empty object to make this a module
export {};
