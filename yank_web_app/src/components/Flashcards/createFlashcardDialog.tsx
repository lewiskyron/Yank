"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import supabaseClient from "@/api/supabase/supabaseClient";
import { toast } from "sonner";
import { type User } from "@supabase/supabase-js";

interface CreateFlashcardDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	folderId: number;
	folderName: string;
	onFlashcardCreated?: () => void;
	user: User | null;
}

export function CreateFlashcardDialog({
	isOpen,
	onOpenChange,
	folderId,
	folderName,
	onFlashcardCreated,
	user,
}: CreateFlashcardDialogProps) {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const PostFlashCardData = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const FlashcardData = {
			folder_id: folderId,
			text: JSON.stringify({
				Question: question,
				Answer: answer,
			}),
			user_id: user?.id,
		};

		try {
			const { error } = await supabaseClient
				.from("Flashcard")
				.insert(FlashcardData);

			if (error) {
				toast.error("Failed to create flashcard.");
			} else {
				toast.success("Flashcard created successfully!");
				setTimeout(() => {
					toast.dismiss();
				}, 3000);
				if (onFlashcardCreated) {
					onFlashcardCreated();
				}
			}
			// Reset form and close dialog
			setQuestion("");
			setAnswer("");
			onOpenChange(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create New Flashcard</DialogTitle>
					<DialogDescription className="text-base font-medium">
						Add a new flashcard to {folderName}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={PostFlashCardData} className="mt-6 space-y-6">
					<div className="space-y-2">
						<label className="text-sm font-medium">Question</label>
						<Textarea
							placeholder="Enter your question"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							className="min-h-[100px] resize-none"
							required
						/>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium">Answer</label>
						<Textarea
							placeholder="Enter the answer"
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							className="min-h-[100px] resize-none"
							required
						/>
					</div>

					{error && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="rounded-lg bg-red-50 p-4 text-red-900 dark:bg-red-950 dark:text-red-200"
						>
							<p className="text-sm">{error}</p>
						</motion.div>
					)}

					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
							disabled={isLoading}
						>
							{isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
							Create Flashcard
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
