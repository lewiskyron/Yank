"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
	return (
		<div className="relative">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white" />

			<div className="container relative mx-auto px-4 py-20 md:py-32">
				<div className="mx-auto flex max-w-4xl flex-col items-center text-center">
					<motion.h1
						className="mb-6 text-4xl font-bold tracking-tight md:text-6xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Create Flashcards in just 2 clicks!
						<br />
						Cut study time in half ⚡️
					</motion.h1>

					<motion.p
						className="mb-8 max-w-2xl text-xl text-gray-600"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Leverage AI and evidence-based memory techniques to create smart
						flashcards that resurface at the perfect time for maximum retention.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<Button size="lg" className="text-lg">
							<Link href="/auth/signUp" prefetch={true}>
								Sign up for free
							</Link>
						</Button>
					</motion.div>

					<motion.div
						className="mt-16 w-full max-w-5xl"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						<div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-2xl">
							<Image
								src="https://www.remnote.com/assets/marketing-pages/medicine/medicine-main.png"
								alt="Yank app interface"
								fill
								className="object-cover"
								priority
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
