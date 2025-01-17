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
}

export interface RatingResponse {
	success: boolean;
	error?: string;
}
