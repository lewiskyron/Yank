import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function QuoteCard() {
	return (
		<Card className="rounded-2xl border-0 bg-gradient-to-br from-gray-50 to-gray-100 shadow-md dark:from-gray-800 dark:to-gray-900">
			<CardContent className="flex flex-col justify-center p-[6.16%]">
				<div className="mb-4 flex items-start">
					<Quote className="mr-3 h-8 w-8 flex-shrink-0 text-indigo-500 opacity-80" />
				</div>
				<p className="mb-3 text-xl font-semibold leading-relaxed tracking-tight text-gray-800 dark:text-gray-100">
					"What can't be measured can't be improved"
				</p>
				<p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
					We are here to help you avoid that.
				</p>
			</CardContent>
		</Card>
	);
}
