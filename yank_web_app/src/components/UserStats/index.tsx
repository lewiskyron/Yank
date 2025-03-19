"use client";
import CardsDueToday from "@/components/UserStats/cards-due";
import LearningGoalCard from "./learning-goal-card";
import ActivityChartCard from "./activity-chart-card";
import StreakCalendarCard from "./streak-calendar-card";
import { QuoteCard } from "./quote-card";
import type User from "@supabase/supabase-js";

interface StatsContentProps {
	user: User.User | null;
}

export default function StatsContent({ user }: StatsContentProps) {
	return (
		<>
			<div className="grid grid-cols-2 gap-6 px-24 py-6">
				<div className="flex flex-col space-y-6">
					<LearningGoalCard user={user} />
					<ActivityChartCard user={user} />
					<QuoteCard />
				</div>
				<div className="flex flex-col space-y-6">
					<CardsDueToday user={user} />
					<StreakCalendarCard user={user} />
				</div>
			</div>
		</>
	);
}

{
	/* <div className="max-w-md">
				<Lottie
					animationData={constructionAnimation}
					loop={true}
					className="h-96 w-96"
				/>
			</div>

			<div className="max-w-2xl space-y-4 text-center">
				<h2 className="text-5xl font-black tracking-tight">
					Coming <span className="text-[#4F46E5]">Soon!</span>
				</h2>
				<p className="text-xl text-gray-600 dark:text-gray-300">
					We're working hard to bring you powerful learning analytics. Soon,
					you'll be able to track your progress, identify areas for improvement,
					and supercharge your learning journey.
				</p>
			</div> */
}
