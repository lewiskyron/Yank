import { ColumnDef } from "@tanstack/react-table";
import { FolderIcon } from "@heroicons/react/24/solid";
import { PracticeButton } from "@/components/Flashcards/practiceButton";
import { useState } from "react";
import { fetchFlashcards } from "@/api/supabase/fetchFlashcards";
import AlertError from "../Alerts/AlertError";
import { FlashCardsDialog } from "@/components/Flashcards/flashCardsDialog";

export type Folder = {
	folder_name: string;
	no_of_flashcards: number;
	folder_id: number;
};

interface Flashcard {
	flashcard_id: string;
	created_at: string;
	folder_id: number;
	user_id: string;
	text: string;
	question: string;
	answer: string;
}

export const columns: ColumnDef<Folder>[] = [
	{
		accessorKey: "folder_name",
		header: "Name",
		cell: ({ row }) => {
			const folderName = row.getValue("folder_name") as string;

			return (
				<div className="flex items-center space-x-2">
					<FolderIcon className="h-5 w-5 text-purple-500" />{" "}
					{/* Fixed purple color */}
					<span>{folderName}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "no_of_flashcards",
		header: "No of Flashcards",
	},
	{
		accessorKey: "Practice",
		header: "Practice",
		cell: ({ row }) => {
			const folderId = row.original.folder_id;
			const folderName = row.original.folder_name;
			const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
			const [isDialogOpen, setIsDialogOpen] = useState(false);
			const [error, setError] = useState<string | null>(null);

			const handlePracticeClick = async (id: number) => {
				setError(null);
				const { data, error } = await fetchFlashcards(id);

				if (error) {
					setError("Failed to fetch flashcards.");
				} else {
					setFlashcards(data);
					setIsDialogOpen(true);
				}
			};

			return (
				<div className="flex flex-col space-y-2">
					<PracticeButton folderId={folderId} onClick={handlePracticeClick} />
					{error && <AlertError errors={[error]} />}

					<FlashCardsDialog
						flashcards={flashcards}
						isOpen={isDialogOpen}
						onOpenChange={setIsDialogOpen}
						folderName={folderName}
					/>
				</div>
			);
		},
	},
];
