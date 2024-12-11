"use client";
import { Folder, columns } from "@/components/FoldersBox/columns";
import { DataTable } from "@/components/FoldersBox/data-table";
import supabaseClient from "@/api/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";

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
		console.log(data);
		return data;
	};

	useEffect(() => {
		getFolders().then((data) => {
			setData(data);
		});
	}, []);

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
