import "./App.css";
import "./index.css";
import Home from "./Mycomponents/Home";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Mycomponents/LoginPage";
import ProtectedRoute from "./Mycomponents/ProtectedRoute";
import { AuthProvider } from "./contexts/OAuthContext";

function App() {
	const [isHighlighterEnabled, setIsHighlighterEnabled] = useState<
		boolean | undefined
	>(undefined);

	type Checked = boolean;
	const handleCheckedChange = (checked: Checked) => {
		setIsHighlighterEnabled(checked);
		chrome.runtime.sendMessage({
			action: "toggleHighlighter",
			data: checked,
		});
	};

	useEffect(() => {
		chrome.storage.sync.get("isHighlighterEnabled", (result) => {
			const isEnabled = result.isHighlighterEnabled ?? false;
			setIsHighlighterEnabled(isEnabled);
		});
	}, []);

	return (
		<>
			<AuthProvider>
				<div className="container mx-auto flex h-[360px] w-[360px] items-center justify-center rounded-lg">
					<Routes>
						<Route
							path="/"
							element={
								<>
									<ProtectedRoute>
										<div className="absolute right-2 top-2">
											<Switch
												checked={isHighlighterEnabled}
												onCheckedChange={handleCheckedChange}
											/>
										</div>
										<Home />
									</ProtectedRoute>
								</>
							}
						/>
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</div>
			</AuthProvider>
		</>
	);
}
export default App;
