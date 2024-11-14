import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { useAuth } from "../contexts/OAuthContext"; // Import the useAuth hook

const GoogleAuthCard = () => {
	const { signInWithGoogle, authError } = useAuth(); // Destructure signInWithGoogle and authError from context

	return (
		<Card className="mt-4 h-80 w-[320px] bg-white shadow-lg transition-shadow hover:shadow-xl">
			<CardHeader className="space-y-2 px-6 pb-4 pt-5 text-center">
				<div className="mt-8 flex items-center justify-center space-x-2">
					<Chrome className="h-5 w-5 text-blue-500" />
					<CardTitle className="text-xl font-bold">Yank</CardTitle>
				</div>
				<CardDescription className="text-sm">
					Sign in to sync your Yank account's
				</CardDescription>
			</CardHeader>
			<CardContent className="px-6 py-4">
				<Button
					variant="outline"
					className="bg-secondary hover:bg-secondary-dark flex h-10 w-full items-center justify-center space-x-2 text-sm text-white"
					onClick={async () => {
						try {
							await signInWithGoogle(); // Call signInWithGoogle on button click
						} catch (error) {
							console.error("Google Sign In failed:", error);
						}
					}}
				>
					<svg
						className="h-4 w-4"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					<span>Continue with Google</span>
				</Button>
				{authError && ( // Display error message if there's an authentication error
					<p className="mt-2 text-center text-sm text-red-500">{authError}</p>
				)}
			</CardContent>
			<CardFooter className="px-6 pb-6 pt-3">
				<p className="text-muted-foreground w-full text-center text-xs">
					By continuing, you agree to Yank's Terms of Service
				</p>
			</CardFooter>
		</Card>
	);
};

export default GoogleAuthCard;
