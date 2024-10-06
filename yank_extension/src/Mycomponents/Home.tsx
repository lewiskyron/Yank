import { Folders } from "./Folders.tsx";
import EditablePreview from "./EditablePreview.tsx";
import { Tags } from "./tags.tsx";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
	const [selectedText, setSelectedText] = useState<string | null>(null);
	useEffect(() => {
		(async () => {
			const response = await chrome.runtime.sendMessage({
				action: "getHighlightedText",
			});
			if (response && response.status === 200 && response.data) {
				setSelectedText(response.data.text);
			} else {
				console.error("Error retrieving highlighted text:", response.message);
			}
		})();
	}, []);

	return (
		<div className="flex flex-col">
			<Folders />
			<EditablePreview initialText={selectedText ? selectedText : ""} />
			<Tags />
			<Button className="mt-2 text-white">Save</Button>
		</div>
	);
};

export default Home;
