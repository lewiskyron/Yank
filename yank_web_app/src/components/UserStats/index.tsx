"use client";
import Lottie from "lottie-react";
import constructionAnimation from "@/app/My-stats/construction-lottie.json";

export default function StatsContent() {
	return (
		<div className="flex flex-col items-center justify-center space-y-8 p-8">
			<div className="max-w-md">
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
			</div>
		</div>
	);
}
