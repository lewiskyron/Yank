import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClipboardList, ChevronDown } from "lucide-react";
import { PracticeMode } from "@/types/flashcard.types";

interface PracticeButtonProps {
	folderId: number;
	onClick: (folderId: number, mode: PracticeMode) => Promise<void>;
}

export function PracticeButton({ folderId, onClick }: PracticeButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex w-fit items-center space-x-2 rounded-md border border-gray-500 px-4 py-2 text-sm text-gray-400 transition hover:bg-gray-700"
				>
					<ClipboardList className="h-4 w-4" />
					<span className="font-medium text-gray-400">Practice</span>
					<ChevronDown className="ml-1 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[200px]">
				<DropdownMenuItem
					onClick={() => onClick(folderId, PracticeMode.SPACED_REPETITION)}
					className="cursor-pointer"
				>
					Spaced Repetition
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onClick(folderId, PracticeMode.CHRONOLOGICAL)}
					className="cursor-pointer"
				>
					Chronological
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
