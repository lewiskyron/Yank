"use client";
import { useState } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import rocketAnimation from "../post-login/rocket_animation.json";
import confettiAnimation from "../post-login/confetti-animation.json";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import highlighterIcon from "../post-login/highlighter.png";
import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";

export function PostLoginSuccess() {
	const router = useRouter();

	return (
		<motion.div
			className="from-background to-background relative flex min-h-screen w-full items-center justify-center bg-gradient-to-b via-purple-200/50 via-50% p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="pointer-events-none fixed inset-0 z-50">
				<Lottie
					animationData={confettiAnimation}
					loop={false}
					className="h-full w-full"
				/>
			</div>
			<Card className="bg-background relative w-full max-w-lg space-y-8 p-10">
				<motion.div
					className="mx-auto h-48 w-48"
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 260, damping: 20 }}
				>
					<Lottie
						animationData={rocketAnimation}
						loop={true}
						className="h-full w-full"
						height={480}
						width={480}
					/>
				</motion.div>
				<motion.div
					className="space-y-4 text-center"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<div className="mb-12 text-center">
						<motion.h2
							className="whitespace-nowrap text-4xl font-black tracking-tight"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.5 }}
						>
							Successfully <span className="text-purple-500">logged in</span>
							<motion.span
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									delay: 1,
									type: "spring",
									stiffness: 500,
									damping: 10,
								}}
							>
								{" "}
								🎉
							</motion.span>
						</motion.h2>
					</div>
					<AnimatePresence mode="wait">
						<motion.div
							key="step1"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<div className="text-center">
								<p className="text-muted-foreground mb-4 text-lg font-semibold tracking-tight">
									Let's create your first folder to store flashcards!
								</p>
							</div>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<motion.div
									animate={{
										y: [0, -10, 0],
									}}
									transition={{
										duration: 1,
										repeat: Number.POSITIVE_INFINITY,
										repeatType: "loop",
									}}
								>
									<Button
										onClick={() => router.push("/folders")}
										className="relative bg-indigo-600 text-white hover:bg-indigo-700"
									>
										<Folder className="mr-2 h-4 w-4" />
										Create Folder
									</Button>
								</motion.div>
							</motion.div>
							<motion.p
								className="text-muted-foreground mb-4 mt-4 text-sm font-semibold tracking-tight"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
							>
								You may be prompted to sign in to the web app.
							</motion.p>
						</motion.div>
					</AnimatePresence>
				</motion.div>
				<motion.div
					className="text-muted-foreground flex items-center justify-center gap-2 text-sm"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					<motion.div
						className="flex h-12 w-12 items-center justify-center rounded border"
						whileHover={{ scale: 1.1, rotate: 5 }}
						whileTap={{ scale: 0.9 }}
					>
						<Image
							src={highlighterIcon || "/placeholder.svg"}
							alt="Extension icon"
							width={28}
							height={28}
							className="object-contain"
						/>
					</motion.div>
					<span>Look for this icon in your browser toolbar</span>
				</motion.div>
			</Card>
		</motion.div>
	);
}
