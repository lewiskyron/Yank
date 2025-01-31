"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type User } from "@supabase/supabase-js";
import { Folder } from "lucide-react";
import CreateFolder from "@/components/FoldersBox/CreateFolder";

interface GettingStartedPageProps {
	user: User | null;
}

export default function GettingStartedPage({ user }: GettingStartedPageProps) {
	return (
		<div className="bg-background mx-auto min-h-screen max-w-4xl p-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="space-y-8"
			>
				<div className="mb-12 space-y-4 text-center">
					<h1 className="text-5xl font-black tracking-tight">
						Getting <span className="text-[#4F46E5]">Started</span>
					</h1>
					<p className="text-muted-foreground text-xl">
						Let's help you get started with creating and managing your
						flashcards.
					</p>
				</div>

				<section className="space-y-4">
					<h2 className="text-2xl font-medium">Create Your First Folder</h2>
					<p className="text-muted-foreground">
						To begin creating and reading flashcards, you'll need a folder to
						organize them. Your folders will be accessible in both the web app
						and Chrome extension.
					</p>
					<CreateFolder user={user} />
					<div className="mt-4 rounded-lg bg-gray-100 p-4">
						<div className="mb-2 flex items-center space-x-2">
							<Folder className="h-5 w-5 text-[#4F46E5]" />
							<h4 className="font-medium">Finding Your Folders</h4>
						</div>
						<p className="text-muted-foreground">
							You can access your created folders through the{" "}
							<span className="font-bold">Folders</span> icon in the app
							sidebar.
						</p>
					</div>
				</section>

				<Separator />

				<section className="space-y-4">
					<h2 className="text-2xl font-medium">Using Our Chrome Extension</h2>
					<div className="space-y-4">
						<div>
							<p className="text-muted-foreground mb-3">
								Enhance your reading experience with AI-generated flashcards
								using our Chrome extension.
							</p>
							<Button className="bg-[#4F46E5] hover:bg-[#4F46E5]/90">
								Install Chrome Extension
							</Button>
						</div>

						<Card className="border-muted border">
							<CardHeader>
								<CardTitle>Best Practices</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<h4 className="font-medium">1. Highlight Specific Content</h4>
									<p className="text-muted-foreground">
										Select precise chunks of text for better quality flashcards.
										The more focused your selection, the better the generated
										cards will be.
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium">2. Focus on Depth</h4>
									<p className="text-muted-foreground">
										Yank is designed for deep learning, not summarization. Focus
										on highlighting key concepts rather than entire articles.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				<Separator />

				<section className="space-y-4">
					<h2 className="text-2xl font-medium">Using the Web App</h2>

					<Card className="border-muted border">
						<CardContent className="space-y-4 pt-6">
							<div className="space-y-2">
								<h4 className="font-semibold">Profile Settings</h4>
								<p className="text-muted-foreground">
									Click on the{" "}
									<span className="font-bold transition-colors hover:text-[#4F46E5]">
										avatar icon
									</span>{" "}
									displaying your email to access your profile settings and
									logout options.
								</p>
							</div>
						</CardContent>
					</Card>

					<h3 className="pt-4 text-2xl font-medium">Reading/Practice Modes</h3>

					<Card className="border-muted border">
						<CardContent className="space-y-4 pt-6">
							<div className="space-y-2">
								<h4 className="font-medium">Chronological Practice</h4>
								<p className="text-muted-foreground">
									Study all your created cards in sequential order.
								</p>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">Spaced Repetition</h4>
								<p className="text-muted-foreground">
									Optimize your learning with our spaced repetition algorithm.
								</p>
							</div>
						</CardContent>
					</Card>
					<div className="mt-6 rounded-lg bg-gray-100 p-4">
						<div className="mb-2 flex items-center space-x-2">
							<Folder className="h-5 w-5 text-[#4F46E5]" />
							<h4 className="font-medium">Finding These Features</h4>
						</div>
						<p className="text-muted-foreground">
							You can access these study modes through the{" "}
							<span className="font-bold">Folders</span> button on the app
							sidebar. Click on a folder, then choose either "Chronological
							Practice" or "Spaced Repetition" to begin your study session.
						</p>
					</div>
				</section>

				<Separator />

				<section className="space-y-4">
					<h2 className="text-2xl font-medium">Reading Flashcards</h2>
					<div className="mb-6 text-center"></div>
					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-muted text-grey border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
							<CardHeader>
								<CardTitle className="text-center">
									AI-Assisted Review
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center">
									<strong>Type your answer</strong> in the text field for
									AI-generated feedback and evaluation.
								</p>
							</CardContent>
						</Card>
						<Card className="border-muted text-grey border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
							<CardHeader>
								<CardTitle className="text-center">Quick Review</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center">
									Use the <strong>"Show Answer" button</strong> for rapid
									self-assessment and review.
								</p>
							</CardContent>
						</Card>
					</div>
				</section>
			</motion.div>
		</div>
	);
}
