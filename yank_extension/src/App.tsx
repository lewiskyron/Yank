import "./App.css";
import "./index.css";
import Home from "./Mycomponents/Home";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

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
			<div className="container mx-auto flex h-[360px] w-[360px] items-center justify-center rounded-lg">
				<div className="absolute right-2 top-2">
					<Switch
						checked={isHighlighterEnabled}
						onCheckedChange={handleCheckedChange}
					/>
				</div>
				<Home />
			</div>
		</>
	);
}
export default App;
