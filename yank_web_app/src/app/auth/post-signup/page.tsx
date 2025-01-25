"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const PostSignup = () => {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<div className="container mx-auto px-4 py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mx-auto max-w-2xl text-center"
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="mb-12 space-y-4 text-center"
					>
						<h2 className="text-7xl font-black tracking-tight">
							Thank you for
							<br />
							choosing <span className="text-[#4F46E5]">Yank!</span>
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							We're excited to help you enhance your productivity.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						<Card className="group relative mt-8">
							<div className="absolute -inset-0.5 animate-pulse rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 opacity-30 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200" />
							<div className="relative rounded-lg bg-white dark:bg-gray-900">
								<CardHeader className="p-8">
									<CardTitle className="mb-8 text-4xl font-bold">
										Enhance Your Experience
									</CardTitle>
									<CardDescription className="text-xl text-gray-600 dark:text-gray-300">
										Install our browser extension to unlock the full potential
										of Yank with{" "}
										<span className="font-bold text-[#4F46E5] drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]">
											AI-powered
										</span>{" "}
										flashcard generation.
									</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col items-center p-8">
									<div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
										<motion.div
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Button
												size="lg"
												className="h-auto rounded-xl bg-[#4F46E5] px-8 py-6 text-lg text-white hover:bg-[#4338CA]"
												onClick={() =>
													window.open(
														"https://chrome.google.com/webstore/detail/your-extension-id",
														"_blank",
													)
												}
											>
												<Download className="mr-2 h-5 w-5" />
												Install Extension
											</Button>
										</motion.div>

										<motion.div
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Link href="/folders">
												<Button
													variant="outline"
													size="lg"
													className="h-auto gap-2 rounded-xl border-gray-200 px-8 py-6 text-lg"
												>
													Skip for now
													<ArrowRight className="h-5 w-5" />
												</Button>
											</Link>
										</motion.div>
									</div>

									<p className="mt-12 text-gray-500 dark:text-gray-400">
										You can always install the extension later from your account
										settings
									</p>
								</CardContent>
							</div>
						</Card>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default PostSignup;
