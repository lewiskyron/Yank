import React, { useState, ChangeEvent, useEffect } from "react";
import { Save } from "lucide-react";
import { MdModeEditOutline } from "react-icons/md";

import { Textarea } from "@/components/ui/textarea";

interface EditablePreviewProps {
	initialText: string;
}

const EditablePreview: React.FC<EditablePreviewProps> = ({ initialText }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [text, setText] = useState<string>(initialText);

	useEffect(() => {
		setText(initialText);
	}, [initialText]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		// Optionally, add a callback to save the text externally
	};

	return (
		<div className="relative mx-auto flex h-[200px] w-[400px] justify-center rounded-lg bg-white p-6 shadow-md">
			{isEditing ? (
				<div className="flex flex-col">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Editing</h2>
						<button
							onClick={handleSaveClick}
							className="bg-secondary flex items-center rounded-md px-3 py-1 text-sm text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
						>
							<Save className="mr-1 h-4 w-4" />
							Save
						</button>
					</div>
					<Textarea value={text} onChange={handleTextChange} className="mt-3" />
				</div>
			) : (
				<div className="flex items-center justify-between">
					<p className="whitespace-pre-wrap text-gray-800">{text}</p>
					<MdModeEditOutline
						onClick={handleEditClick}
						className="absolute right-0 top-0 mr-2 mt-2 cursor-pointer text-gray-600 hover:text-blue-500"
					/>
				</div>
			)}
		</div>
	);
};

export default EditablePreview;
