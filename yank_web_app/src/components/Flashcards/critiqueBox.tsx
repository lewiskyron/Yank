import { motion } from "motion/react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CritiqueResponse } from "@/types/flashcard.types";

type AnswerCritiqueProps = {
	critiqueProps: CritiqueResponse | null;
	isLoading?: boolean;
};

export function CritiqueBox({
	critiqueProps,
	isLoading = false,
}: AnswerCritiqueProps) {
	if (isLoading) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 100, damping: 20 }}
				className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
			>
				<div className="flex items-center gap-2">
					<div className="h-5 w-5 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600"></div>
					<div className="h-6 w-32 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
				</div>
				<div className="mt-3 h-[200px] animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
			</motion.div>
		);
	}
	if (!critiqueProps) return null;

	const { evaluation, critique } = critiqueProps;
	const { correct_parts, incorrect_parts, corrected_answer } = critique;
	const hasCorrectParts = !!correct_parts?.trim();
	const hasIncorrectParts = !!incorrect_parts?.trim();

	// Determine background color based on evaluation
	const getBgColor = () => {
		const evalText = evaluation.toLowerCase();
		if (evalText === "correct") {
			return "bg-green-50 dark:bg-green-950/30";
		} else if (evalText === "not quite") {
			return "bg-orange-50 dark:bg-orange-950/30";
		} else {
			return "bg-red-50 dark:bg-red-950/30";
		}
	};

	// Determine text color based on evaluation
	const getTextColor = () => {
		const evalText = evaluation.toLowerCase();
		if (evalText === "correct") {
			return "text-green-700 dark:text-green-400";
		} else if (evalText === "not quite") {
			return "text-orange-700 dark:text-orange-400";
		} else {
			return "text-red-700 dark:text-red-400";
		}
	};

	// Get appropriate icon based on evaluation
	const EvaluationIcon = () => {
		const evalText = evaluation.toLowerCase();
		if (evalText === "correct") {
			return (
				<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
			);
		} else if (evalText === "not quite") {
			return (
				<AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500" />
			);
		} else {
			return <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />;
		}
	};

	const renderTextWithBold = (text: string) => {
		if (!text) return null;

		// Split by asterisks
		const parts = text.split(/(\*[^*]+\*)/g);

		return parts.map((part, index) => {
			// Check if this part is surrounded by asterisks
			if (part.startsWith("*") && part.endsWith("*")) {
				// Remove the asterisks and wrap in strong tag
				const content = part.substring(1, part.length - 1);
				return <strong key={index}>{content}</strong>;
			}
			// Return regular text
			return <span key={index}>{part}</span>;
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ type: "spring", stiffness: 100, damping: 20 }}
			className={`rounded-lg ${getBgColor()}`}
		>
			<div className="flex items-center gap-2 border-b border-gray-200 p-3 dark:border-gray-700">
				<EvaluationIcon />
				<span className={`text-lg font-medium ${getTextColor()}`}>
					{evaluation}
				</span>
			</div>

			<ScrollArea className="h-[200px] w-full rounded-b-md p-4">
				<div className="space-y-4">
					{hasCorrectParts && (
						<div className={getTextColor()}>
							{renderTextWithBold(correct_parts)}
						</div>
					)}

					{hasIncorrectParts && (
						<div className="mt-3">{renderTextWithBold(incorrect_parts)}</div>
					)}

					{corrected_answer && (
						<div className="mt-4 rounded bg-white/50 p-3 dark:bg-black/20">
							<p className="font-medium">Corrected answer:</p>
							<p className="mt-1">{renderTextWithBold(corrected_answer)}</p>
						</div>
					)}
				</div>
			</ScrollArea>

			<div className="flex justify-end p-2">
				<button className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
					Expand
				</button>
			</div>
		</motion.div>
	);
}
