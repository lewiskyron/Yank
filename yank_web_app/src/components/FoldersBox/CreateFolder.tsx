"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SaveFolderDialog from "./SaveFolderDialog";
import { type User } from "@supabase/supabase-js";

interface CreateFolderProps {
	user: User | null;
}

export default function CreateFolder({ user }: CreateFolderProps) {
	const [showDialog, setShowDialog] = useState(false);

	return (
		<div>
			<Button
				className="bg-[#4F46E5] text-white hover:bg-[#4338CA]"
				onClick={() => setShowDialog(true)}
			>
				+ Folder
			</Button>

			<SaveFolderDialog
				show={showDialog}
				onClose={() => setShowDialog(false)}
				user={user}
			/>
		</div>
	);
}
