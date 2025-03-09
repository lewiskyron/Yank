"use client";
import { Folder, columns } from "@/components/FoldersBox/columns";
import { DataTable } from "@/components/FoldersBox/data-table";
import supabaseClient from "@/api/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface FolderBoxProps {
	user: User | null;
}

export default function FoldersBox(props: FolderBoxProps) {
	const [data, setData] = useState<Folder[]>([]);

	const getFolders = async () => {
		const { data, error } = await supabaseClient
			.from("Folders")
			.select("*")
			.eq("user_id", props.user?.id);
		if (error) {
			throw error;
		}
		return data;
	};

	const refetchFolders = async () => {
		const updatedfolders = await getFolders();
		setData(updatedfolders);
	};

	useEffect(() => {
		getFolders().then((data) => {
			setData(data);
		});
	}, []);

	return (
		<div className="container mx-auto py-10">
			<div className="mb-4 flex justify-end">
				<Button
					onClick={refetchFolders}
					variant="outline"
					size="icon"
					className="hover:bg-gray-100"
				>
					<ArrowPathIcon className="h-4 w-4 text-purple-800" />
				</Button>
			</div>
			<DataTable columns={columns(props.user, refetchFolders)} data={data} />
		</div>
	);
}
