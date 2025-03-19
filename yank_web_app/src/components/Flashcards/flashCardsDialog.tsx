"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import confetti from "./confetti.json";
import Lottie from "lottie-react";
import { X, Flame, ThumbsUp, Zap } from "lucide-react";
import { rateFlashcard } from "@/api/supabase/fsrsAdapter";
import { Grade, Rating } from "ts-fsrs";
import { FlashcardDialogProps } from "@/types/flashcard.types";
import { PracticeMode } from "@/types/flashcard.types";
import successAnimation from "./success-animation.json";
import bunnyloader from "./bunny-loader.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { getCritique } from "@/api/axios/flashcardCritique";
import { CritiqueResponse } from "@/types/flashcard.types";
import { CritiqueBox } from "./critiqueBox";
import { trackDailyReview } from "@/api/supabase/statsAdapter";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export function FlashCardsDialog({
	flashcards,
	isOpen,
	onOpenChange,
	folderName,
	practiceMode,
}: FlashcardDialogProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userAnswer, setUserAnswer] = useState("");
	const [showAnswer, setShowAnswer] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showRatingSuccess, setShowRatingSuccess] = useState(false);
	const [critique, setCritique] = useState<CritiqueResponse | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isCritiqueLoading, setIsCritiqueLoading] = useState(false);

	const handleRating = async (rating: Grade) => {
		if (isSubmitting || !currentFlashcard) return;

		try {
			setIsSubmitting(true);
			const response = await rateFlashcard(currentFlashcard, rating);
			if (response.success) {
				setShowRatingSuccess(true);
				setTimeout(() => {
					setShowRatingSuccess(false);
				}, 1800);
			} else {
				console.error("Failed to rate flashcard:", response.error);
			}
		} catch (error) {
			console.error("Error rating flashcard:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleGetCritique = async () => {
		if (!currentFlashcard || !userAnswer.trim() || isCritiqueLoading) return;
		setIsCritiqueLoading(true);
		try {
			const response = await getCritique(currentFlashcard, userAnswer);
			if (response.success && response.data) {
				if (critique == null) {
					trackDailyReview(
						flashcards[currentIndex].user_id,
						flashcards[currentIndex].folder_id,
					);
				}
				setCritique(response.data as CritiqueResponse);
			} else {
				console.error("Failed to get critique:", response.error);
			}
		} catch (error) {
			console.error("Error getting critique:", error);
		} finally {
			setIsCritiqueLoading(false);
		}
	};

	const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && userAnswer.trim()) {
			e.preventDefault();
			await handleGetCritique();
		}
	};

	useEffect(() => {
		if (flashcards.length > 0) {
			// Load stored index on initial load
			if (flashcards && folderName) {
				const storedIndex = localStorage.getItem(
					`flashcardIndex_${folderName}`,
				);
				if (storedIndex) {
					const parsedIndex = parseInt(storedIndex, 10);
					if (!isNaN(parsedIndex) && parsedIndex < flashcards.length) {
						setCurrentIndex(parsedIndex);
					}
				}
			}
		}
	}, [flashcards, folderName]);

	useEffect(() => {
		if (flashcards.length > 0) {
			// Save current index to localStorage
			localStorage.setItem(
				`flashcardIndex_${folderName}`,
				currentIndex.toString(),
			);

			// Reset UI state when current index changes
			setShowAnswer(false);
			setUserAnswer("");
			setCritique(null);
			setIsCritiqueLoading(false);

			// Focus the input field when the flashcard changes
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [currentIndex, flashcards.length, folderName]);

	useEffect(() => {
		// Clear critique when user changes their answer
		if (critique) {
			setCritique(null);
		}
	}, [userAnswer]);

	const handleNext = () => {
		if (flashcards.length > 0) {
			setShowAnswer(false);
			setUserAnswer("");
			setCurrentIndex((prev) => (prev + 1) % flashcards.length);
		}
	};

	const handleshowAnswer = () => {
		const userId = flashcards[currentIndex].user_id;
		const folderId = flashcards[currentIndex].folder_id;
		if (!showAnswer) {
			trackDailyReview(userId, folderId);
		}
		setShowAnswer(true);
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
								ref={inputRef}
								placeholder="Type in your answer, and get feedback from our AI Tutor."
								value={userAnswer}
								onChange={(e) => setUserAnswer(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<p className="mt-1 text-xs text-gray-500">
								Press Enter to submit your answer for feedback
							</p>
						</div>

						{/* Display loader when fetching critique */}
						{isCritiqueLoading && (
							<div className="flex w-full justify-center py-6">
								{/* <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div> */}
								<Player
									autoplay
									loop={true}
									src={bunnyloader}
									style={{ height: "200px", width: "200px" }}
								>
									<Controls
										visible={false}
										buttons={["play", "repeat", "frame", "debug"]}
									/>
								</Player>
							</div>
						)}

						{/* Display critique when available (not loading) */}
						{!isCritiqueLoading && critique && (
							<div className="w-full">
								<CritiqueBox critiqueProps={critique} isLoading={false} />
							</div>
						)}

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

						{((showAnswer && !isCritiqueLoading) || critique) &&
							practiceMode === PracticeMode.SPACED_REPETITION && (
								<motion.div
									className="relative mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{
										type: "spring",
										stiffness: 100,
										damping: 20,
										delay: 0.2,
									}}
								>
									{!showRatingSuccess ? (
										<>
											<Button
												onClick={() => handleRating(Rating.Again)}
												variant="outline"
												className="flex h-auto max-w-[120px] flex-col items-center gap-1 whitespace-normal break-words p-3 text-center"
											>
												<X className="h-5 w-5 text-red-500" />
												<span className="font-medium">Didn't Know</span>
												<span className="text-muted-foreground text-xs">
													I didn't know it or got it wrong.
												</span>
											</Button>
											<Button
												onClick={() => handleRating(Rating.Hard)}
												variant="outline"
												className="flex h-auto max-w-[120px] flex-col items-center gap-1 whitespace-normal break-words p-3 text-center"
											>
												<Flame className="h-5 w-5 text-orange-500" />
												<span className="font-medium">Tricky</span>
												<span className="text-muted-foreground text-xs">
													I remembered, but it was really hard.
												</span>
											</Button>
											<Button
												onClick={() => handleRating(Rating.Good)}
												variant="outline"
												className="flex h-auto max-w-[120px] flex-col items-center gap-1 whitespace-normal break-words p-3 text-center"
											>
												<ThumbsUp className="h-5 w-5 text-green-500" />
												<span className="font-medium">Got It</span>
												<span className="text-muted-foreground text-xs">
													I remembered with some effort.
												</span>
											</Button>
											<Button
												onClick={() => handleRating(Rating.Easy)}
												variant="outline"
												className="flex h-auto max-w-[120px] flex-col items-center gap-1 whitespace-normal break-words p-3 text-center"
											>
												<Zap className="h-5 w-5 text-blue-500" />
												<span className="font-medium">Too Easy</span>
												<span className="text-muted-foreground text-xs">
													I remembered it instantly!
												</span>
											</Button>
										</>
									) : (
										<div className="col-span-4 flex justify-center">
											<Player
												autoplay
												loop={false}
												src={successAnimation}
												style={{ height: "100px", width: "100px" }}
												speed={2.5}
											>
												<Controls
													visible={false}
													buttons={["play", "repeat", "frame", "debug"]}
												/>
											</Player>
										</div>
									)}
								</motion.div>
							)}

						<div className="flex gap-2">
							<Button
								onClick={handleshowAnswer}
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
