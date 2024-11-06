import { Folders } from "./Folders";
import EditablePreview from "./EditablePreview";
import { Tags } from "./tags";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import axios, { AxiosError } from "axios";
import supabase from "@/api/supabaseClient";
import { Database } from "../types/database.types";

type FolderType = Database["public"]["Tables"]["Folders"]["Row"];

const Home: React.FC = () => {
	const [selectedText, setSelectedText] = useState<string | null>(null);
	const [responseText, setResponseText] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [folders, setFolders] = useState<FolderType[]>([]);
	const [selectedFolder, setSelectedFolder] = useState<number | null>(null);

	const fetchFolders = async () => {
		const { data, error } = await supabase.from("Folders").select();
		if (data) {
			setFolders(data);
		} else {
			console.error("Error fetching folders:", error);
		}
	};

	useEffect(() => {
		fetchFolders();
	}, []);

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
				setIsLoading(true);
				try {
					const customPrompt = `
						Given the following text, create a flashcard focusing on a key concept."

						Flashcard Format:
						Question: Write a single, clear question that directly tests understanding of the main idea. maximum words count 15
						Answer: Provide a brief, straightforward answer explaining the concept.maximum word count 35
						Text: """${selectedText}"""   
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
					setIsLoading(false);
				}
			}
		};
		fetchFlashCard();
	}, [selectedText]);

	const handleSave = async () => {
		if (selectedFolder && responseText) {
			try {
				await supabase.from("Flashcard").insert({
					folder_id: selectedFolder,
					text: responseText,
					user_id: "d2fa8b37-69f1-493f-84fc-e6acac21b600",
				});
				alert("Flashcard saved successfully!");
			} catch (error) {
				console.error("Error saving flashcard:", error);
				setError("Failed to save flashcard.");
			}
		} else {
			alert("Please select a folder to save the flashcard.");
		}
	};

	return (
		<div className="flex flex-col">
			<Folders
				folders={folders}
				selectedFolder={selectedFolder}
				onSelectFolder={setSelectedFolder}
			/>
			{isLoading && <p>Loading...</p>}
			{error && !isLoading && <p style={{ color: "red" }}>{error}</p>}
			{!isLoading && (
				<EditablePreview initialText={responseText ? responseText : ""} />
			)}
			<Tags />
			<Button className="mt-2 text-white" onClick={handleSave}>
				Save
			</Button>
		</div>
	);
};

export default Home;
