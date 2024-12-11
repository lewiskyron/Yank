// src/components/Flashcards/PracticeDialog.tsx
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface Flashcard {
	flashcard_id: string;
	created_at: string;
	folder_id: number;
	user_id: string;
	text: string;
	question: string;
	answer: string;
}

interface PracticeDialogProps {
	flashcards: Flashcard[];
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function FlashCardsDialog({
	flashcards,
	isOpen,
	onOpenChange,
}: PracticeDialogProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userAnswer, setUserAnswer] = useState("");
	const [showAnswer, setShowAnswer] = useState(false);

	const currentFlashcard = flashcards[currentIndex];

	const handleNext = () => {
		setShowAnswer(false);
		setUserAnswer("");
		setCurrentIndex((prev) => (prev + 1) % flashcards.length);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Practice Flashcards</DialogTitle>
					<DialogDescription>
						Please answer the following question:
					</DialogDescription>
				</DialogHeader>

				{flashcards.length > 0 ? (
					<div className="mt-4 space-y-4">
						<p className="text-lg font-semibold">{currentFlashcard.question}</p>

						<input
							type="text"
							placeholder="Type your answer"
							value={userAnswer}
							onChange={(e) => setUserAnswer(e.target.value)}
							className="w-full rounded-md border p-2"
						/>

						{showAnswer && (
							<p className="mt-2 font-medium text-green-600">
								Answer: {currentFlashcard.answer}
							</p>
						)}

						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setShowAnswer(true)}
								className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
							>
								Show Answer
							</button>
							<button
								onClick={handleNext}
								className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
							>
								Next
							</button>
						</div>
					</div>
				) : (
					<p className="mt-4 text-gray-500">No flashcards available.</p>
				)}
			</DialogContent>
		</Dialog>
	);
}
