// src/api/fetchFlashcards.ts
import supabaseClient from "./supabaseClient";

export const fetchFlashcards = async (folderId: number) => {
	// Fetch flashcards that belong to the given folder.
	const { data, error } = await supabaseClient
		.from("Flashcard")
		.select("*")
		.eq("folder_id", folderId);

	if (error) {
		console.error("Error fetching flashcards:", error);
		return { data: null, error };
	}

	if (!data) {
		return { data: [], error: null };
	}

	// Transform the fetched flashcards to extract question and answer fields.
	const transformed = data.map((flashcard) => {
		let question = "";
		let answer = "";
		try {
			const parsed = JSON.parse(flashcard.text);
			question = parsed.Question || "";
			answer = parsed.Answer || "";
		} catch (err) {
			console.error("Error parsing flashcard text:", err);
		}

		return {
			...flashcard,
			question,
			answer,
		};
	});

	return { data: transformed, error: null };
};
