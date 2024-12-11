import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import supabaseClient from "@/api/supabase/supabaseClient";
import { type User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface SaveFolderDialogProps {
	show: boolean;
	onClose: () => void;
	user: User | null;
}

export default function SaveFolderDialog({
	show,
	onClose,
	user,
}: SaveFolderDialogProps) {
	const [folderName, setFolderName] = useState("");

	const FolderData = {
		folder_name: folderName,
		user_id: user?.id,
	};

	const PostFolderData = async () => {
		const { error } = await supabaseClient.from("Folders").insert(FolderData);
		if (error) {
			toast.error("Failed to save folder.");
		} else {
			toast.success("Flashcard saved successfully!");
			setTimeout(() => {
				toast.dismiss();
			}, 3000);
			onClose();
		}
	};

	return (
		<Dialog open={show} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Folder</DialogTitle>
					<DialogDescription>
						Enter the name of the folder you want to create.
					</DialogDescription>
				</DialogHeader>
				<input
					type="text"
					placeholder="Folder Name"
					value={folderName}
					onChange={(e) => setFolderName(e.target.value)}
					className="mb-4 w-full border p-2"
				/>
				<div className="flex justify-end space-x-2">
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button
						className="bg-[#4F46E5] text-white hover:bg-[#4338CA]"
						onClick={PostFolderData}
					>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
