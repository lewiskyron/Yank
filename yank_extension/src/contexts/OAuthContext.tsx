import { createContext, useContext, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "@/api/supabaseClient";
import { useEffect } from "react";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
	user: User | null;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
	authError: string;
	loading: boolean;
}

const OAuthContext = createContext<AuthContextType | undefined>(undefined);
type Message = { action: "AUTH_SUCCESS"; session: Session | null };

interface GeneralResponse {
	status: number;
	message: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [authError, setAuthError] = useState<string>("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const restoreSession = async () => {
			setLoading(true);
			try {
				const storageData = await chrome.storage.local.get("session");
				const { session } = storageData;

				if (session) {
					setUser(session.user);
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error("Error restoring session:", error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		restoreSession();

		// Listen for OAuth success messages
		const handleAuthMessage = (
			message: Message,
			_sender: chrome.runtime.MessageSender,
			sendResponse: (response?: GeneralResponse) => void,
		) => {
			if (message.action === "AUTH_SUCCESS" && message.session) {
				console.log(
					"Received session from background script:",
					message.session,
				);
				setUser(message.session.user);
				sendResponse({ status: 200, message: "Success" });
			}
		};

		chrome.runtime.onMessage.addListener(handleAuthMessage);

		return () => {
			chrome.runtime.onMessage.removeListener(handleAuthMessage);
		};
	}, []);

	const signInWithGoogle = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: chrome.identity.getRedirectURL(),
			},
		});

		if (error) {
			setAuthError(error.message);
			return;
		}

		chrome.runtime.sendMessage(
			{ action: "SET_SIGNING_IN", value: true },
			(response) => {
				if (chrome.runtime.lastError) {
					console.error(
						"Error sending message to background:",
						chrome.runtime.lastError,
					);
				} else {
					console.log("Background acknowledged sign-in state:", response);
				}
			},
		);

		// Open the OAuth URL in a new tab
		await chrome.tabs.create({ url: data.url as string });
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			setAuthError(error.message);
			return;
		}
		setUser(null);
		chrome.storage.local.remove("session");
	};

	return (
		<OAuthContext.Provider
			value={{ user, signInWithGoogle, authError, signOut, loading }}
		>
			{children}
		</OAuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(OAuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
