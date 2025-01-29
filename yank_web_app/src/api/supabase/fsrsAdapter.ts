import {
	Card,
	createEmptyCard,
	FSRS,
	generatorParameters,
	Grade,
} from "ts-fsrs";
import supabaseClient from "./supabaseClient";
import { TransformedFlashcard } from "@/types/flashcard.types";
import { RatingResponse } from "@/types/flashcard.types";
import { DbFlashcard } from "@/types/flashcard.types";

// Convert our flashcard to FSRS Card format
const convertToFSRSCard = (flashcard: TransformedFlashcard): Card => {
	const card = createEmptyCard();

	// If the flashcard has existing FSRS properties, use them
	return {
		...card,
		due: new Date(flashcard.due || Date.now()),
		stability: flashcard.stability || card.stability,
		difficulty: flashcard.difficulty || card.difficulty,
		reps: flashcard.reps || card.reps,
		lapses: flashcard.lapses || card.lapses,
		state: flashcard.state || card.state,
		last_review: flashcard.last_review
			? new Date(flashcard.last_review)
			: card.last_review,
	};
};

// Apply a specific rating to a card and get the next state
const applyRating = (flashcard: TransformedFlashcard, rating: Grade): Card => {
	const params = generatorParameters({
		enable_fuzz: true,
		enable_short_term: true,
	});
	const fsrs = new FSRS(params);
	const fsrsCard = convertToFSRSCard(flashcard);
	const result = fsrs.next(fsrsCard, new Date(), rating);
	return result.card;
};

// Convert FSRS Card back to our flashcard format
const convertFromFSRSCard = (fsrsCard: Card): Partial<DbFlashcard> => {
	return {
		due: fsrsCard.due.toISOString().replace("T", " ").replace("Z", ""),
		stability: fsrsCard.stability,
		difficulty: fsrsCard.difficulty,
		reps: fsrsCard.reps,
		lapses: fsrsCard.lapses,
		state: fsrsCard.state,
		last_review: (fsrsCard.last_review || new Date())
			.toISOString()
			.replace("T", " ")
			.replace("Z", ""),
	};
};

// Update flashcard in database with new scheduling
const updateFlashcardScheduling = async (
	flashcardId: string,
	schedulingData: Partial<DbFlashcard>,
): Promise<{ data: DbFlashcard | null; error: Error | null }> => {
	console.log(`This is the scheduling data: ${schedulingData}`);
	console.log(`This is the flashcard id: ${flashcardId}`);

	try {
		const { data, error } = await supabaseClient
			.from("Flashcard")
			.update(schedulingData)
			.eq("flashcard_id", flashcardId)
			.select()
			.single();

		if (error) throw error;

		return {
			data: data as DbFlashcard,
			error: null,
		};
	} catch (err) {
		console.error("Error updating flashcard scheduling:", err);
		return {
			data: null,
			error: err instanceof Error ? err : new Error("Unknown error"),
		};
	}
};

// Main function to handle rating a flashcard
export const rateFlashcard = async (
	flashcard: TransformedFlashcard,
	rating: Grade,
): Promise<RatingResponse> => {
	try {
		// Apply the rating and get the next card state
		const nextCardState = applyRating(flashcard, rating);

		// Convert the FSRS card back to our format
		const updatedFlashcard = convertFromFSRSCard(nextCardState);

		const { data } = await updateFlashcardScheduling(
			flashcard.flashcard_id,
			updatedFlashcard,
		);

		if (!data) {
			return {
				success: false,
				error: "Error updating flashcard scheduling",
			};
		}

		return { success: true };
	} catch (err) {
		console.error("Error rating flashcard:", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : "Unable to rate flashcard",
		};
	}
};
