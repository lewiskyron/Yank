"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { DbFlashcard } from "@/types/flashcard.types";
import { getDueCards } from "@/api/supabase/statsAdapter";
import type { User } from "@supabase/supabase-js";
import { PracticeMode } from "@/types/flashcard.types";
import { FlashCardsDialog } from "@/components/Flashcards/flashCardsDialog";
import { TransformedFlashcard } from "@/types/flashcard.types";
import { transformFlashcard } from "@/api/supabase/fetchFlashcards";

interface CardsDueTodayProps {
	initialCardsDue?: number;
	className?: string;
	user: User | null;
}

export default function CardsDueToday({
	initialCardsDue = 0,
	className,
	user,
}: CardsDueTodayProps) {
	const [dueCardsCount, setDueCardsCount] = useState(initialCardsDue);
	const [dueCards, setDueCards] = useState<DbFlashcard[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [transformedFlasshcards, setTransformedFlasshcards] = useState<
		TransformedFlashcard[]
	>([]);

	useEffect(() => {
		getDueCards(user?.id || "")
			.then((response) => {
				if (response.statusCode === 200 && response.data) {
					setDueCardsCount(response.dueCardsCount || 0);
					setDueCards(response.data);
				}
			})
			.catch((error) => {
				console.error("Error fetching due cards:", error);
			});
	}, [user]);

	const handlePracticeClick = async () => {
		const ChangedFlashcards = dueCards.map(transformFlashcard);
		setTransformedFlasshcards(ChangedFlashcards);
		setIsDialogOpen(true);
	};

	// Determine message based on number of cards
	const getMessage = () => {
		if (dueCardsCount === 0) return "All caught up!";
		if (dueCardsCount <= 5) return "Almost there!";
		if (dueCardsCount <= 15) return "Keep up the momentum!";
		return "Time to focus on your learning!";
	};

	return (
		<>
			<Card className={cn("w-full max-w-md overflow-hidden", className)}>
				<CardContent className="p-0">
					{/* Top gradient accent */}
					<div className="h-0.5 bg-gradient-to-r from-[#4F46E5] to-[#818CF8]" />

					<div className="space-y-2 p-3">
						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-1">
								<Clock className="h-3 w-3 text-[#4F46E5]" />
								<h3 className="text-sm font-medium">Due Today</h3>
							</div>
						</div>

						{/* Main content - large number */}
						<div className="flex flex-col items-center justify-center py-2">
							<div className="text-4xl font-bold text-[#4F46E5] md:text-5xl">
								{dueCardsCount}
							</div>
							<div className="mt-0.5 flex items-center gap-1">
								<BookOpen className="text-muted-foreground h-3 w-3" />
								<span className="text-muted-foreground text-sm">cards due</span>
							</div>
							<p className="mt-1 text-center text-sm font-medium">
								{getMessage()}
							</p>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-2 gap-2">
							<div className="flex flex-col items-center rounded-lg bg-slate-50 p-1.5">
								<span className="text-muted-foreground text-xs">
									Estimated time
								</span>
								<span className="text-sm font-medium">
									{Math.ceil(dueCardsCount * 0.25)} mins
								</span>
							</div>
							<div className="flex flex-col items-center rounded-lg bg-slate-50 p-1.5">
								<span className="text-muted-foreground text-xs">
									Completion
								</span>
								<span className="text-sm font-medium">
									{dueCardsCount === 0 ? "100%" : "0%"}
								</span>
							</div>
						</div>
					</div>
				</CardContent>

				<CardFooter className="p-3 pt-0">
					<Button
						className="w-full bg-[#4F46E5] py-2 text-sm font-medium text-white hover:bg-[#4338CA]"
						onClick={handlePracticeClick}
					>
						Start Practice
					</Button>
				</CardFooter>
			</Card>

			<FlashCardsDialog
				flashcards={transformedFlasshcards}
				isOpen={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				folderName="Due Cards"
				practiceMode={PracticeMode.SPACED_REPETITION}
			/>
		</>
	);
}
