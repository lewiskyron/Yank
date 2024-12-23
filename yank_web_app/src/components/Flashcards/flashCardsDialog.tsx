"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import confetti from "./confetti.json";
import Lottie from "lottie-react";

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
	folderName: string;
}

export function FlashCardsDialog({
	flashcards,
	isOpen,
	onOpenChange,
	folderName,
}: PracticeDialogProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userAnswer, setUserAnswer] = useState("");
	const [showAnswer, setShowAnswer] = useState(false);

	useEffect(() => {
		if (flashcards.length > 0) {
			const storedIndex = localStorage.getItem(`flashcardIndex_${folderName}`);
			if (storedIndex) {
				const parsedIndex = parseInt(storedIndex, 10);
				if (!isNaN(parsedIndex) && parsedIndex < flashcards.length) {
					setCurrentIndex(parsedIndex);
				}
			}
		}
	}, [flashcards, folderName]);

	useEffect(() => {
		if (flashcards.length > 0) {
			localStorage.setItem(
				`flashcardIndex_${folderName}`,
				currentIndex.toString(),
			);
		}
	}, [currentIndex, flashcards.length, folderName]);

	useEffect(() => {
		if (flashcards.length > 0) {
			setShowAnswer(false);
			setUserAnswer("");
		}
	}, [flashcards]);

	const handleNext = () => {
		if (flashcards.length > 0) {
			setShowAnswer(false);
			setUserAnswer("");
			setCurrentIndex((prev) => (prev + 1) % flashcards.length);
		}
	};

	const currentFlashcard =
		flashcards.length > 0 ? flashcards[currentIndex] : null;

	const displayCount =
		flashcards.length > 0 ? (currentIndex % flashcards.length) + 1 : 0;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Flashcards for {folderName}</DialogTitle>
					<DialogDescription className="text-base font-medium">
						Please answer the following question:
					</DialogDescription>
					{flashcards.length > 0 && (
						<div className="absolute right-12 top-2 text-sm text-gray-800">
							{displayCount}/{flashcards.length}
						</div>
					)}
				</DialogHeader>

				{currentFlashcard ? (
					<div className="mt-6 space-y-6">
						<h3 className="text-lg font-semibold">
							{currentFlashcard.question}
						</h3>
						<div className="relative">
							<Input
								placeholder="Type in your answer, and get feedback from the AI Tutor."
								value={userAnswer}
								onChange={(e) => setUserAnswer(e.target.value)}
							/>
						</div>

						{showAnswer && (
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ type: "spring", stiffness: 100, damping: 20 }}
								className="rounded-lg bg-green-50 p-4 dark:bg-green-950"
							>
								<p className="font-medium text-green-900 dark:text-green-200">
									Answer: {currentFlashcard.answer}
								</p>
							</motion.div>
						)}

						<div className="flex gap-2">
							<Button
								onClick={() => setShowAnswer(true)}
								size="lg"
								className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
							>
								<Eye className="h-4 w-4" />
								Show Answer
							</Button>
							<Button
								onClick={handleNext}
								size="lg"
								className="w-full gap-2 bg-gray-600 hover:bg-gray-700"
							>
								Next
							</Button>
						</div>
					</div>
				) : (
					<p className="text-muted-foreground mt-4 text-center">
						No flashcards available.
					</p>
				)}
				{flashcards.length > 5 && displayCount === flashcards.length && (
					<div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
						<Lottie animationData={confetti} autoplay loop={false} />
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
