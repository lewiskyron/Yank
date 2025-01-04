"use client";

import Lottie from "lottie-react";
import rocketAnimation from "../post-login/rocket_animation.json";
import confettiAnimation from "../post-login/confetti-animation.json";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import highlighterIcon from "../post-login/highlighter.png";

export function PostLoginSuccess() {
	return (
		<div className="from-background to-background relative flex min-h-screen w-full items-center justify-center bg-gradient-to-b via-purple-200/50 via-50% p-4">
			<div className="pointer-events-none fixed inset-0 z-50">
				<Lottie
					animationData={confettiAnimation}
					loop={false}
					className="h-full w-full"
				/>
			</div>
			<Card className="bg-background relative w-full max-w-lg space-y-8 p-10">
				<div className="mx-auto h-48 w-48">
					<Lottie
						animationData={rocketAnimation}
						loop={true}
						className="h-full w-full"
						height={480}
						width={480}
					/>
				</div>
				<div className="space-y-4 text-center">
					<h1 className="text-3xl font-bold tracking-tight">
						Successfully logged in! 🎉
					</h1>
					<p className="text-muted-foreground">
						Click on the extension icon in your browser toolbar to start
						generating flashcards!
					</p>
				</div>
				<div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
					<div className="flex h-12 w-12 items-center justify-center rounded border">
						<Image
							src={highlighterIcon}
							alt="Extension icon"
							width={28}
							height={28}
							className="object-contain"
						/>
					</div>
					<span>Look for this icon in your browser toolbar</span>
				</div>
			</Card>
		</div>
	);
}
