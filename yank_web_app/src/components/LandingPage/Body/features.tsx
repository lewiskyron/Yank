"use client";

import { Card } from "@/components/ui/card";
import { Zap, FileText } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Features() {
	const ExtensionVideoURI =
		"https://wbxueysawskymjeqmssw.supabase.co/storage/v1/object/public/Landing%20Page%20Videos/Screen%20Recording%202025-01-17%20at%2010.52.20%20PM.mov?t=2025-01-20T03%3A20%3A32.138Z";

	const SpacedRepetitionURI =
		"https://wbxueysawskymjeqmssw.supabase.co/storage/v1/object/public/Landing%20Page%20Videos/SpacedRepetition.mov";
	const ConfettiURI =
		"https://wbxueysawskymjeqmssw.supabase.co/storage/v1/object/public/Landing%20Page%20Videos/Confetti.mov";
	const purpleCardRef = useRef(null);
	const blueCardRef = useRef(null);
	const yellowCardRef = useRef(null);

	const purpleCardInView = useInView(purpleCardRef, {
		once: true,
		amount: 0.5,
	});
	const blueCardInView = useInView(blueCardRef, { once: true, amount: 0.5 });
	const yellowCardInView = useInView(yellowCardRef, {
		once: true,
		amount: 0.5,
	});

	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className="mb-20 text-center"
			>
				<h2 className="mb-12 text-2xl font-bold md:text-3xl">
					Join <span className="text-purple-500">1,000+ students</span> creating
					flashcards effortlessly as they take notes!
				</h2>
			</motion.div>
			<div className="mb-12 space-y-4 text-center">
				<h2 className="text-7xl font-black tracking-tight">
					Features Designed
					<br />
					with <span className="text-purple-500">You</span> in Mind
				</h2>
			</div>
			{/* Purple Card - Flashcards */}
			<Card
				className="w-full overflow-hidden bg-purple-50/80"
				ref={purpleCardRef}
			>
				<motion.div
					initial={{ x: -300, opacity: 0 }}
					animate={
						purpleCardInView ? { x: 0, opacity: 1 } : { x: -300, opacity: 0 }
					}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="p-6">
						<div className="grid items-start gap-8 md:grid-cols-[0.8fr,1.2fr]">
							<div className="space-y-6">
								<div className="h-8 w-8">
									<div className="h-6 w-6 rotate-12 transform rounded-md bg-purple-500" />
								</div>
								<div className="space-y-4">
									<h1 className="text-4xl font-bold tracking-tight">
										Create flashcards in{" "}
										<span className="text-purple-500">0.5 seconds</span> with
										our Chrome Extension!
									</h1>
									<p className="text-lg text-gray-600">
										Highlight as you read—our AI instantly creates flashcards.
										No app-switching needed.
									</p>
								</div>
							</div>
							<div className="relative mt-12 aspect-[16/6] overflow-hidden rounded-lg bg-purple-50/80">
								<video
									className="h-full w-full object-contain"
									poster="/api/placeholder/600/400"
									autoPlay
									loop
									muted
									playsInline
								>
									<source src={ExtensionVideoURI} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							</div>
						</div>
					</div>
				</motion.div>
			</Card>

			{/* Blue Card - Spaced Repetition */}
			<Card className="w-full overflow-hidden bg-blue-50/80" ref={blueCardRef}>
				<motion.div
					initial={{ x: 300, opacity: 0 }}
					animate={
						blueCardInView ? { x: 0, opacity: 1 } : { x: 300, opacity: 0 }
					}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="p-6">
						<div className="grid items-start gap-8 md:grid-cols-[0.8fr,1.2fr]">
							<div className="space-y-6">
								<div className="h-8 w-8">
									<Zap className="h-6 w-6 text-blue-500" />
								</div>
								<div className="space-y-4">
									<h1 className="text-4xl font-bold tracking-tight">
										Study efficiently with{" "}
										<span className="text-blue-500">spaced repetition</span>
									</h1>
									<p className="text-lg text-gray-600">
										Flashcards, timed perfectly, beat all other learning
										methods—backed by research.
									</p>
								</div>
							</div>
							<div className="relative aspect-video w-full overflow-hidden rounded-lg bg-blue-50/80">
								<video
									className="h-full w-full object-contain"
									poster="/api/placeholder/600/400"
									autoPlay
									loop
									muted
									playsInline
								>
									<source src={SpacedRepetitionURI} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							</div>
						</div>
					</div>
				</motion.div>
			</Card>

			{/* Yellow Card - Smart Notes */}
			<Card
				className="w-full overflow-hidden bg-yellow-50/80"
				ref={yellowCardRef}
			>
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={
						yellowCardInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
					}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="p-6">
						<div className="grid items-start gap-8 md:grid-cols-[0.8fr,1.2fr]">
							<div className="space-y-6">
								<div className="h-8 w-8">
									<FileText className="h-6 w-6 text-yellow-500" />
								</div>
								<div className="space-y-4">
									<h1 className="text-4xl font-bold tracking-tight">
										Stay in your <span className="text-yellow-500">groove</span>{" "}
										with built-in study incentives
									</h1>
									<p className="text-lg text-gray-600">
										Keep studying with in-app rewards and motivation systems
										designed to keep you on track.
									</p>
								</div>
							</div>
							<div className="relative aspect-[14/9] overflow-hidden rounded-lg bg-yellow-50/80">
								<video
									className="h-full w-full object-contain"
									poster="/api/placeholder/600/400"
									autoPlay
									loop
									muted
									playsInline
								>
									<source src={ConfettiURI} type="video/mp4" />
									Your browser does not support the video tag.
								</video>
							</div>
						</div>
					</div>
				</motion.div>
			</Card>
		</div>
	);
}
