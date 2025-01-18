// src/api/fetchFlashcards.ts
import supabaseClient from "./supabaseClient";
import { TransformedFlashcard } from "@/types/flashcard.types";
import { DbFlashcard } from "@/types/flashcard.types";
import { PracticeMode } from "@/types/flashcard.types";

const parseDateTime = (dateStr: string | Date | null): Date | null => {
	if (!dateStr) return null;
	try {
		// Convert "2025-01-14 04:26:10.799" format to "2025-01-14T04:26:10.799Z"
		if (typeof dateStr === "string") {
			dateStr = dateStr.replace(" ", "T") + "Z";
		}
		return new Date(dateStr);
	} catch (err) {
		console.error("Error parsing date:", err);
		return null;
	}
};

const isCardDue = (
	card: TransformedFlashcard,
	currentTime: Date = new Date(),
): boolean => {
	if (!card.due) return true;

	const dueDate = parseDateTime(card.due);
	if (!dueDate) return true;
	return dueDate.getTime() <= currentTime.getTime();
};

// Pure function to parse flashcard text into question and answer
const parseFlashcardText = (
	text: string | null,
): { question: string; answer: string } => {
	if (!text) return { question: "", answer: "" };

	try {
		const parsed = JSON.parse(text);
		return {
			question: parsed.Question || "",
			answer: parsed.Answer || "",
		};
	} catch (err) {
		console.error("Error parsing flashcard text:", err);
		return { question: "", answer: "" };
	}
};

// Pure function to transform a flashcard
const transformFlashcard = (flashcard: DbFlashcard): TransformedFlashcard => {
	const { question, answer } = parseFlashcardText(flashcard.text);
	return {
		...flashcard,
		question,
		answer,
	};
};

export const fetchFlashcards = async (
	folderId: number,
	practiceMode: PracticeMode = PracticeMode.SPACED_REPETITION,
) => {
	try {
		const { data: rawData, error } = await supabaseClient
			.from("Flashcard")
			.select("*")
			.eq("folder_id", folderId);

		if (error) {
			console.error("Error fetching flashcards:", error);
			return { data: null, error };
		}

		if (!rawData) {
			return { data: [], error: null };
		}

		// Transform the flashcards
		const transformedCards = rawData.map(transformFlashcard);

		// Sort and filter based on practice mode
		let finalCards: TransformedFlashcard[] = [];

		switch (practiceMode) {
			case PracticeMode.SPACED_REPETITION:
				return {
					data: transformedCards.filter((card) => isCardDue(card)),
					error: null,
				};

			case PracticeMode.CHRONOLOGICAL:
				return {
					data: transformedCards.sort((a, b) => {
						const dateA = parseDateTime(a.created_at);
						const dateB = parseDateTime(b.created_at);
						if (!dateA || !dateB) return 0;
						return dateB.getTime() - dateA.getTime();
					}),
					error: null,
				};

			default:
				finalCards = transformedCards; // Fallback case
				break;
		}

		return {
			data: finalCards,
			error: null,
		};
	} catch (err) {
		console.error("Unexpected error in fetchFlashcards:", err);
		return {
			data: null,
			error: err instanceof Error ? err : new Error("Unknown error"),
		};
	}
};
