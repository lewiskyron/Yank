// src/types/flashcard.ts

import { Tables } from "@/types/database.types";

// Supabase generated types
export type DbFlashcard = Tables<"Flashcard">;

// Transformed Type for UI
export type TransformedFlashcard = DbFlashcard & {
	question: string;
	answer: string;
};

export interface FlashcardResponse {
	data: TransformedFlashcard | null;
	error: Error | null;
}

// Props interface for the dialog component
export interface FlashcardDialogProps {
	flashcards: TransformedFlashcard[];
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	folderName: string;
	practiceMode: PracticeMode;
}

export interface RatingResponse {
	success: boolean;
	error?: string;
}

export enum PracticeMode {
	SPACED_REPETITION = "spaced_repetition",
	CHRONOLOGICAL = "chronological",
}

// this is just here for reference.
export interface GeminiResponse {
	candidates: {
		content: {
			parts: {
				text: string;
			}[];
			role: string;
		};
		finishReason: string;
		groundingMetadata: {
			searchEntryPoint: {
				renderedContent: string;
			};
			groundingChunks: {
				web: {
					uri: string;
					title: string;
				};
			}[];
			groundingSupports: {
				segment: {
					startIndex: number;
					endIndex: number;
					text: string;
				};
				groundingChunkIndices: number[];
				confidenceScores: number[];
			}[];
			retrievalMetadata: Record<string, unknown>; // Placeholder for unknown metadata structure
			webSearchQueries: string[];
		};
	}[];
}

export interface CritiqueResponse {
	evaluation: string; // bucketed response [Correct, Wrong or Not Quite]
	critique: {
		correct_parts: string; // Correct aspects
		incorrect_parts: string; // Incorrect aspects
		corrected_answer: string; // Suggested correction or improvement
	};
}
