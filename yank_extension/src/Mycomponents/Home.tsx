import React, { useEffect, useState } from "react";
import { Folders } from "./Folders";
import EditablePreview from "./EditablePreview";
import { Button } from "@/components/ui/button";
import api from "../api/axiosConfig";
import axios, { AxiosError } from "axios";
import supabase from "@/api/supabaseClient";
import { Database } from "../types/database.types";
import { useAuth } from "@/contexts/OAuthContext";
import type { CachedResponses } from "@/chrome-services/utils/background";
import { toast } from "sonner";
import Navigation from "./navigation";

type FolderType = Database["public"]["Tables"]["Folders"]["Row"];
const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const Home: React.FC = () => {
	const { user } = useAuth();
	const [selectedText, setSelectedText] = useState<string | null>(null);
	const [responseText, setResponseText] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [folders, setFolders] = useState<FolderType[]>([]);
	const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
	const [fetchedTexts, setFetchedTexts] = useState<Set<string>>(new Set());

	// Fetch folders from the database
	const fetchFolders = async () => {
		const { data, error } = await supabase.from("Folders").select();
		if (data) {
			setFolders(data);
		} else {
			console.error("Error fetching folders:", error);
		}
	};

	// Initialize folders and fetchedTexts on mount
	useEffect(() => {
		fetchFolders();

		// Fetch and initialize `fetchedTexts` and `lastCleanedAt`
		chrome.storage.local.get(["fetchedTexts", "lastCleanedAt"], (result) => {
			const storedFetchedTexts = result.fetchedTexts || [];
			const lastCleanedAt = result.lastCleanedAt || 0;
			const now = Date.now();

			// If REFRESH_INTERVAL has passed, clear fetchedTexts
			if (now - lastCleanedAt > REFRESH_INTERVAL) {
				chrome.storage.local.set(
					{ fetchedTexts: [], lastCleanedAt: now },
					() => {
						setFetchedTexts(new Set());
						console.log("Cleared fetchedTexts due to refresh interval.");
					},
				);
			} else {
				// Otherwise, use the existing fetchedTexts
				setFetchedTexts(new Set(storedFetchedTexts));
			}
		});
	}, []);

	// Get highlighted text from Chrome extension
	useEffect(() => {
		const getHighlightedText = async () => {
			try {
				const response = await chrome.runtime.sendMessage({
					action: "getHighlightedText",
				});
				if (response && response.status === 200 && response.data) {
					const newSelectedText = response.data.text;
					if (newSelectedText && newSelectedText !== selectedText) {
						setSelectedText(newSelectedText);
					}
				} else {
					setError("Failed to retrieve highlighted text. Please highlight again.");
				}
			} catch {
				setError("An error occurred while fetching highlighted text.");
			}
		};

		getHighlightedText();
	}, []);

	// Fetch flashcard from API based on selectedText
	const fetchFlashCard = async () => {
		if (!selectedText || selectedText.trim() === "") return;

		// Retrieve cachedResponses from storage
		const { cachedResponses } = await new Promise<{
			cachedResponses: CachedResponses;
		}>((resolve, reject) => {
			chrome.storage.local.get("cachedResponses", (result) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					resolve(result as { cachedResponses: CachedResponses });
				}
			});
		});

		if (fetchedTexts.has(selectedText)) {
			const cachedResponse = cachedResponses[selectedText];

			if (cachedResponse) {
				// Use cached response if available
				setResponseText(cachedResponse.text);
				setIsLoading(false);
				return;
			}
		}

		if (
			selectedText &&
			selectedText.trim() !== "" &&
			!fetchedTexts.has(selectedText)
		) {
			setIsLoading(true);
			try {
				const customPrompt = `
						Create a flashcard focusing on a key concept from the following text.
						Flashcard Format:
						- **Question**: Formulate a single, clear atomic question that directly tests understanding of the main idea of the selected text. Maximum 15 words.
						- **Answer**: Provide a brief, straightforward answer explaining the concept. at least 35 words. If the selected text is 
						vague provide more context in the answer.

						Ensure that the question is atomic (targets one specific idea), not vague, and not overly verbose.
						Text: """${selectedText}"""
						Return the response in the following format:
							"Question": "Your question here",
							"Answer": "Your answer here".

						Do not include any introductory or explanatory text. Please ensure the return type is JSON always.
						`;
				const response = await api.post("/completions", {
					messages: [{ role: "user", content: customPrompt }],
					model: "gpt-4o-mini",
				});
				const assistantMessage =
					response.data.choices[0]?.message?.content || "";
				setResponseText(assistantMessage);

				const updatedFetchedTexts = new Set(fetchedTexts);
				updatedFetchedTexts.add(selectedText);

				const updatedCachedResponses = {
					...cachedResponses,
					[selectedText]: {
						text: assistantMessage,
						timestamp: Date.now(),
					},
				};

				await new Promise<void>((resolve, reject) => {
					chrome.storage.local.set(
						{
							fetchedTexts: Array.from(updatedFetchedTexts),
							cachedResponses: updatedCachedResponses,
						},
						() => {
							if (chrome.runtime.lastError) {
								reject(chrome.runtime.lastError);
							} else {
								resolve();
							}
						},
					);
				});

				// Add to fetchedTexts and update chrome.storage.local
				setFetchedTexts(updatedFetchedTexts);
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

	// Trigger fetchFlashCard whenever selectedText changes
	useEffect(() => {
		if (selectedText && selectedText.trim() !== "") {
			fetchFlashCard();
		}
	}, [selectedText]);

	// Save the responseText to the database
	const handleSave = async () => {
		if (selectedFolder && responseText) {
			try {
				await supabase.from("Flashcard").insert({
					folder_id: selectedFolder,
					text: responseText,
					user_id: user?.id,
				});
				toast.success("Flashcard saved successfully!");
				setTimeout(() => {
					toast.dismiss();
				}, 3000);
				setResponseText("");
				setSelectedText("");
			} catch {
				setError("Failed to save flashcard.");
				toast.error("Failed to save flashcard.");
			}
		} else {
			toast.error("Please select a folder to save the flashcard.");
		}
	};

	return (
		<div className="flex flex-col">
			<Navigation />
			<Folders
				folders={folders}
				selectedFolder={selectedFolder}
				onSelectFolder={setSelectedFolder}
			/>
			{isLoading && <p>Loading...</p>}
			{error && !isLoading && <p style={{ color: "red" }}>{error}</p>}
			{!isLoading && <EditablePreview initialText={responseText || ""} />}
			<Button className="mt-4 text-white" onClick={handleSave}>
				Save
			</Button>
		</div>
	);
};

export default Home;
