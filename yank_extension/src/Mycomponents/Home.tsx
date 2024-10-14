import { Folders } from "./Folders.tsx";
import EditablePreview from "./EditablePreview.tsx";
import { Tags } from "./tags.tsx";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig.ts";
import axios, { AxiosError } from "axios";

const Home: React.FC = () => {
	const [selectedText, setSelectedText] = useState<string | null>(null);
	const [responseText, setResponseText] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isloading, setIsloading] = useState<boolean>(false);

	useEffect(() => {
		const getHighlightedText = async () => {
			try {
				const response = await chrome.runtime.sendMessage({
					action: "getHighlightedText",
				});
				if (response && response.status === 200 && response.data) {
					setSelectedText(response.data.text);
				} else {
					console.error("Error retrieving highlighted text:", response.message);
					setError("Failed to retrieve highlighted text.");
				}
			} catch (err) {
				console.error("Error in chrome.runtime.sendMessage:", err);
				setError("An error occurred while fetching highlighted text.");
			}
		};

		getHighlightedText();
	}, []);

	useEffect(() => {
		const fetchFlashCard = async () => {
			if (selectedText && selectedText.trim() !== "") {
				setIsloading(true);
				try {
					const customPrompt = `
						Using the following text, create a flashcard with a clear and concise question and answer.

						- **Format**:
						- **Question**: A single, direct question that tests understanding of the key concept.
						- **Answer**: A brief explanation or definition answering the question.

						Text:
						"""${selectedText}"""
						`;
					const response = await api.post("/completions", {
						messages: [
							{
								role: "user",
								content: customPrompt,
							},
						],
						model: "llama3-8b-8192",
					});
					const assistantMessage =
						response.data.choices[0]?.message?.content || "";
					setResponseText(assistantMessage);
				} catch (err) {
					if (axios.isAxiosError(err)) {
						const axiosError = err as AxiosError;
						console.error("Axios error:", axiosError.message);
						setError(`API Error: ${axiosError.message}`);
					} else {
						console.error("Unexpected error:", err);
						setError("An unexpected error occurred.");
					}
				} finally {
					setIsloading(false);
				}
			}
		};
		fetchFlashCard();
	}, [selectedText]);

	// Fetch data from OpenAI API whenever selectedText changes

	return (
		<div className="flex flex-col">
			<Folders />
			{isloading && <p>Loading...</p>}
			{error && !isloading && <p style={{ color: "red" }}>{error}</p>}
			{!isloading && (
				<EditablePreview initialText={responseText ? responseText : ""} />
			)}
			<Tags />
			<Button className="mt-2 text-white">Save</Button>
		</div>
	);
};

export default Home;
