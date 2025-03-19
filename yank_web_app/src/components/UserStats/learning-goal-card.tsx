"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LightbulbIcon, Timer } from "lucide-react";
import { type User } from "@supabase/supabase-js";
import { updateGoalToServer } from "@/api/supabase/statsAdapter";
import { getUserGoal } from "@/api/supabase/statsAdapter";

interface LearningGoalCardProps {
	user: User | null;
}

export default function LearningGoalCard({ user }: LearningGoalCardProps) {
	const [cardsPerDay, setCardsPerDay] = useState(16);
	const [minsPerDay, setMinsPerDay] = useState(4);
	const sliderRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);
	const isDraggingRef = useRef(false);
	const sliderWidth = useRef(0);
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		getUserGoal(user)
			.then((response) => {
				if (
					response.statusCode === 200 &&
					response.data &&
					response.data.length > 0
				) {
					setCardsPerDay(response.data[0].daily_goal);
				}
			})
			.catch((error) => {
				console.error("Error fetching user goal:", error);
			});
	}, [user]);

	// Calculate time based on cards (roughly 15 seconds per card)
	useEffect(() => {
		setMinsPerDay(Math.round((cardsPerDay * 20) / 60));
	}, [cardsPerDay]);

	// Update goal when cards per day changes - with proper debounce
	useEffect(() => {
		// Clear any existing timeout
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		// Set new timeout
		debounceTimerRef.current = setTimeout(() => {
			updateGoalToServer(user, cardsPerDay);
		}, 3500); // 3.5 seconds after last change

		// Cleanup function to clear timeout if component unmounts or cardsPerDay changes again
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, [cardsPerDay]);

	useEffect(() => {
		// Helper function to calculate cards from a position percentage
		const calculateCardCount = (percentage: number) => {
			return Math.max(1, Math.min(51, Math.round((percentage / 100) * 51)));
		};

		const handleMouseDown = () => {
			isDraggingRef.current = true;
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDraggingRef.current || !sliderRef.current || !thumbRef.current)
				return;

			const thumbWidth = thumbRef.current.offsetWidth;
			const halfThumbWidth = thumbWidth / 2;

			const sliderRect = sliderRef.current.getBoundingClientRect();
			sliderWidth.current = sliderRect.width;

			// Calculate position relative to slider
			let position = e.clientX - sliderRect.left;
			position = Math.max(
				halfThumbWidth,
				Math.min(position, sliderRect.width - halfThumbWidth),
			);

			// Update thumb position
			const percentage = (position / sliderRect.width) * 100;
			thumbRef.current.style.left = `${percentage}%`;
			setCardsPerDay(calculateCardCount(percentage));
		};

		const handleMouseUp = () => {
			isDraggingRef.current = false;
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		// Touch events for mobile
		const handleTouchStart = () => {
			isDraggingRef.current = true;
			document.addEventListener("touchmove", handleTouchMove);
			document.addEventListener("touchend", handleTouchEnd);
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (!isDraggingRef.current || !sliderRef.current || !thumbRef.current)
				return;

			const sliderRect = sliderRef.current.getBoundingClientRect();
			sliderWidth.current = sliderRect.width;

			// Calculate position relative to slider
			let position = e.touches[0].clientX - sliderRect.left;
			position = Math.max(0, Math.min(position, sliderRect.width));

			// Update thumb position
			const percentage = (position / sliderRect.width) * 100;
			thumbRef.current.style.left = `${percentage}%`;
			setCardsPerDay(calculateCardCount(percentage));
		};

		const handleTouchEnd = () => {
			isDraggingRef.current = false;
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
		};

		const thumb = thumbRef.current;
		const slider = sliderRef.current;

		if (thumb && slider) {
			thumb.addEventListener("mousedown", handleMouseDown);
			thumb.addEventListener("touchstart", handleTouchStart);
		}

		return () => {
			if (thumb && slider) {
				thumb.removeEventListener("mousedown", handleMouseDown);
				thumb.removeEventListener("touchstart", handleTouchStart);
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
				document.removeEventListener("touchmove", handleTouchMove);
				document.removeEventListener("touchend", handleTouchEnd);
			}
		};
	}, []);

	return (
		<Card className="mx-auto w-full max-w-xl">
			<CardContent className="p-2">
				<div className="space-y-2">
					<div>
						<h2 className="text-base font-bold">Daily Learning Goal</h2>
						<p className="text-muted-foreground text-xs">
							How much do you want to practice each day?
						</p>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-xs font-semibold">
							<span className="text-sm">{cardsPerDay}</span> cards per day
						</div>
						<div className="text-muted-foreground flex items-center gap-1">
							<Timer className="h-2.5 w-2.5" />
							<span className="text-xs">{minsPerDay} mins per day</span>
						</div>
					</div>

					<div className="relative h-4 w-full" ref={sliderRef}>
						<div className="absolute inset-0 overflow-hidden rounded-sm">
							<div className="h-full w-full bg-gradient-to-r from-[#c5e1a5] to-[#2e7d32]"></div>
						</div>

						{/* Tick marks */}
						<div className="absolute inset-0 flex justify-between px-4">
							{[...Array(11)].map((_, i) => (
								<div key={i} className="flex h-full items-center">
									<div className="h-2.5 w-0.5 bg-white/30"></div>
								</div>
							))}
						</div>

						{/* Draggable thumb */}
						<div
							ref={thumbRef}
							className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-md active:cursor-grabbing"
							style={{ left: `${(cardsPerDay / 50) * 100}%` }}
						/>
					</div>

					<div className="mt-2 rounded-sm bg-gray-50 p-1.5">
						<div className="mb-0.5 flex items-center gap-1">
							<LightbulbIcon className="h-2.5 w-2.5 text-amber-500" />
							<h3 className="text-xs font-semibold">Upcoming Cards</h3>
						</div>
						<p className="text-muted-foreground text-xs">
							You have no documents to practice.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
