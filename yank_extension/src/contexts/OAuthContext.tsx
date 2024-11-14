import { createContext, useContext, useState } from "react";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
	user: User | null;
	signInWithGoogle: () => Promise<void>;
	authError: string;

}

const OAuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [authError, setAuthError] = useState<string>("")

	
	const signInWithGoogle = async () => {
		try{
			const response = await chrome.runtime.sendMessage({ action: "signInWithGoogle" });
			if (response.status === 200) {
				setUser(response.user);
			}else{
				setAuthError(response.error);

			}
		} catch (error) {
			console.error("Sign-in error:", error);
		}
	};

	return (
		<OAuthContext.Provider value={{ user, signInWithGoogle, authError }}>
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
}
	

	
