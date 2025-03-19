"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	ChevronRight,
	Calendar,
	Flame,
	Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserStreak } from "@/api/supabase/statsAdapter";
import { type User } from "@supabase/supabase-js";

interface StreakCalendarCardProps {
	user: User | null;
}

// Calculate current streak (consecutive days up to today)
const calculateCurrentStreak = (streakDates: string[]) => {
	if (!streakDates.length) return 0;

	// Sort dates in descending order (newest first)
	const sortedDates = [...streakDates].sort(
		(a, b) => new Date(b).getTime() - new Date(a).getTime(),
	);

	// Get today and yesterday's date strings
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// Check if today is in the streak
	const todayStr = today.toISOString().split("T")[0];
	const hasTodayStreak = sortedDates.includes(todayStr);

	if (!hasTodayStreak) return 0;

	let currentStreak = 1;
	const checkDate = today;

	// Count backwards from today
	while (true) {
		checkDate.setDate(checkDate.getDate() - 1);
		const checkDateStr = checkDate.toISOString().split("T")[0];

		if (sortedDates.includes(checkDateStr)) {
			currentStreak++;
		} else {
			break;
		}
	}

	return currentStreak;
};

// Calculate longest streak
const calculateLongestStreak = (streakDates: string[]) => {
	if (!streakDates.length) return 0;

	// Sort dates chronologically
	const sortedDates = [...streakDates].sort(
		(a, b) => new Date(a).getTime() - new Date(b).getTime(),
	);

	let currentStreak = 1;
	let maxStreak = 1;

	for (let i = 1; i < sortedDates.length; i++) {
		const prevDate = new Date(sortedDates[i - 1]);
		const currDate = new Date(sortedDates[i]);

		// Check if dates are consecutive
		prevDate.setDate(prevDate.getDate() + 1);

		if (
			prevDate.toISOString().split("T")[0] ===
			currDate.toISOString().split("T")[0]
		) {
			currentStreak++;
			maxStreak = Math.max(maxStreak, currentStreak);
		} else {
			currentStreak = 1;
		}
	}

	return maxStreak;
};

export default function StreakCalendarCard({ user }: StreakCalendarCardProps) {
	const today = new Date();
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const [streakDates, setStreakDates] = useState<string[]>([]);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	// Fetch streak data when user or month changes
	useEffect(() => {
		const fetchStreakData = async () => {
			if (!user) {
				setStreakDates([]);
				return;
			}

			try {
				const response = await getUserStreak(user.id);
				if (response.statusCode === 200 && response.data) {
					console.log("Streak data:", response.data);
					// Extract just the streak_date strings
					const dates = response.data.map((item) => item.streak_date);
					setStreakDates(dates);
				}
			} catch (error) {
				console.error("Error fetching streak data:", error);
			}
		};

		fetchStreakData();
	}, [user]);

	// Calculate calendar data for current month view
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

	// Filter streak days for the current month view
	const currentMonthStreakDays = streakDates
		.filter((dateStr) => {
			const date = new Date(dateStr);
			return (
				date.getUTCMonth() === currentMonth &&
				date.getUTCFullYear() === currentYear
			);
		})
		.map((dateStr) => {
			const date = new Date(dateStr);
			return date.getUTCDate();
		});

	// Check if we're viewing the current month
	const isCurrentMonth =
		currentMonth === today.getMonth() && currentYear === today.getFullYear();

	const goToPreviousMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	const goToNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	};

	const goToCurrentMonth = () => {
		setCurrentMonth(today.getMonth());
		setCurrentYear(today.getFullYear());
	};

	// Calculate streak stats
	const currentStreak = calculateCurrentStreak(streakDates);
	const longestStreak = calculateLongestStreak(streakDates);

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 px-3 pb-0 pt-2">
				<div>
					<CardTitle className="text-sm font-bold">Streak Calendar</CardTitle>
					<p className="text-muted-foreground text-[10px]">
						Track your daily learning consistency
					</p>
				</div>
				<div className="flex flex-col items-center gap-1">
					<span className="text-muted-foreground text-[10px]">
						Total days studied
					</span>
					<div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-amber-700">
						<Flame className="h-3 w-3 fill-amber-500 text-amber-500" />
						<span className="text-xs font-medium">
							{streakDates.length} days
						</span>
					</div>
				</div>
			</CardHeader>

			<CardContent className="px-3 pb-3">
				{/* Month navigation */}
				<div className="mb-1 flex items-center justify-between">
					<div className="flex items-center gap-1">
						<Button
							variant="outline"
							size="icon"
							className="h-5 w-5"
							onClick={goToPreviousMonth}
						>
							<ChevronLeft className="h-3 w-3" />
						</Button>
						<h3 className="text-xs font-medium">
							{monthNames[currentMonth]} {currentYear}
						</h3>
						<Button
							variant="outline"
							size="icon"
							className="h-5 w-5"
							onClick={goToNextMonth}
							disabled={isCurrentMonth}
						>
							<ChevronRight className="h-3 w-3" />
						</Button>
					</div>

					{!isCurrentMonth && (
						<Button
							variant="ghost"
							size="sm"
							className="h-5 text-[10px]"
							onClick={goToCurrentMonth}
						>
							<Calendar className="mr-1 h-2.5 w-2.5" />
							Today
						</Button>
					)}
				</div>

				{/* Calendar grid */}
				<div className="grid grid-cols-7 gap-0.5">
					{/* Day names */}
					{dayNames.map((day, index) => (
						<div
							key={index}
							className="text-muted-foreground py-0.5 text-center text-[8px] font-medium"
						>
							{day}
						</div>
					))}

					{/* Empty cells for days before the 1st of the month */}
					{Array.from({ length: firstDayOfMonth }).map((_, index) => (
						<div key={`empty-${index}`} className="aspect-square" />
					))}

					{/* Calendar days */}
					{Array.from({ length: daysInMonth }).map((_, index) => {
						const day = index + 1;
						const isToday = isCurrentMonth && day === today.getDate();
						const hasStreak = currentMonthStreakDays.includes(day);

						return (
							<div
								key={day}
								className={cn(
									"relative flex aspect-square flex-col items-center justify-center rounded text-[8px]",
									isToday && "bg-slate-100",
									hasStreak && "bg-amber-50",
								)}
							>
								<span
									className={cn(
										"absolute right-0.5 top-0.5 text-[6px]",
										isToday && "font-bold text-[#4F46E5]",
									)}
								>
									{day}
								</span>

								{hasStreak && (
									<div className="mt-1">
										<span role="img" aria-label="fire" className="text-[8px]">
											🔥
										</span>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Streak stats */}
				<div className="mt-2 grid grid-cols-2 gap-2">
					<div className="flex items-center justify-between rounded-lg bg-slate-50 p-1.5">
						<div>
							<p className="text-muted-foreground text-[8px]">Current Streak</p>
							<p className="text-xs font-semibold">{currentStreak} days</p>
						</div>
						<Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
					</div>

					<div className="flex items-center justify-between rounded-lg bg-slate-50 p-1.5">
						<div>
							<p className="text-muted-foreground text-[8px]">Longest Streak</p>
							<p className="text-sm font-semibold">{longestStreak} days</p>
						</div>
						<Trophy className="h-6 w-6 text-amber-500" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
