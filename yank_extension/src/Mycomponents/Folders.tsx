import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Database } from "../types/database.types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type FolderType = Database["public"]["Tables"]["Folders"]["Row"];

interface FoldersProps {
	folders: FolderType[];
	selectedFolder: number | null;
	onSelectFolder: (folderId: number | null) => void;
}

export function Folders({
	folders,
	selectedFolder,
	onSelectFolder,
}: FoldersProps): JSX.Element {
	const [open, setOpen] = useState(false);

	return (
		<div className="mb-2 mr-24 grid grid-cols-2">
			<p className="text-md ml-14 mt-2 font-semibold">Save to:</p>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between bg-white"
					>
						{selectedFolder !== null
							? folders.find((folder) => folder.folder_id === selectedFolder)
									?.folder_name
							: "Select folder..."}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] bg-white p-0">
					<Command>
						<CommandInput placeholder="Search folders..." />
						<CommandList>
							<CommandEmpty>No folder found.</CommandEmpty>
							<CommandGroup>
								{folders.map((folder) => (
									<CommandItem
										key={folder.folder_id}
										value={folder.folder_id.toString()}
										onSelect={(currentValue) => {
											const selectedId = parseInt(currentValue);
											onSelectFolder(
												selectedId === selectedFolder ? null : selectedId,
											);
											setOpen(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												selectedFolder === folder.folder_id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										{folder.folder_name}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
