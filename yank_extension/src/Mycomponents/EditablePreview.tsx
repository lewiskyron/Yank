import React, { useState, ChangeEvent, useEffect } from "react";
import { Save } from "lucide-react";
import { MdModeEditOutline } from "react-icons/md";

import { Textarea } from "@/components/ui/textarea";

interface EditablePreviewProps {
	initialText: string;
}

const EditablePreview: React.FC<EditablePreviewProps> = ({ initialText }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [parsedText, setParsedText] = useState<{
		question: string;
		answer: string;
	}>({
		question: "",
		answer: "",
	});

	// Parse the initial text into question and answer
	useEffect(() => {
		try {
			const parsed = JSON.parse(initialText);
			setParsedText({
				question: parsed.Question || "",
				answer: parsed.Answer || "",
			});
		} catch (error) {
			// Fallback if parsing fails
			setParsedText({
				question: "Unable to parse question",
				answer: initialText,
			});
			console.error("Error parsing initial text:", error);
		}
	}, [initialText]);

	const [editingSection, setEditingSection] = useState<
		"question" | "answer" | null
	>(null);

	const handleEditClick = (section: "question" | "answer") => {
		setIsEditing(true);
		setEditingSection(section);
	};

	const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (editingSection === "question") {
			setParsedText((prev) => ({ ...prev, question: e.target.value }));
		} else if (editingSection === "answer") {
			setParsedText((prev) => ({ ...prev, answer: e.target.value }));
		}
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		setEditingSection(null);
	};

	return (
		<div className="relative mx-auto flex h-[250px] w-[350px] flex-col justify-center overflow-hidden rounded-lg bg-white p-4 shadow-md">
			{isEditing && editingSection ? (
				<div className="flex h-full flex-col">
					<div className="mb-2 flex items-center justify-between">
						<h2 className="text-md font-semibold">
							Editing {editingSection === "question" ? "Question" : "Answer"}
						</h2>
						<button
							onClick={handleSaveClick}
							className="bg-secondary flex items-center rounded-md px-2 py-1 text-xs text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
						>
							<Save className="mr-1 h-3 w-3" />
							Save
						</button>
					</div>
					<Textarea
						value={
							editingSection === "question"
								? parsedText.question
								: parsedText.answer
						}
						onChange={handleTextChange}
						className="flex-grow resize-none text-sm"
					/>
				</div>
			) : (
				<div className="flex h-full flex-col">
					<div className="flex flex-grow flex-col justify-center overflow-hidden border-b border-gray-200 pb-2">
						<div className="mb-2 flex items-center justify-between">
							<h2 className="text-sm font-semibold">Question</h2>
							<MdModeEditOutline
								onClick={() => handleEditClick("question")}
								className="cursor-pointer text-sm text-gray-600 hover:text-blue-500"
							/>
						</div>
						<div className="flex h-full items-center justify-center">
							<p className="max-h-full w-full overflow-auto break-words px-2 text-center text-xs text-gray-800">
								{parsedText.question}
							</p>
						</div>
					</div>

					<div className="mt-2 flex flex-grow flex-col justify-center overflow-hidden">
						<div className="mb-2 flex items-center justify-between">
							<h2 className="text-sm font-semibold">Answer</h2>
							<MdModeEditOutline
								onClick={() => handleEditClick("answer")}
								className="cursor-pointer text-sm text-gray-600 hover:text-blue-500"
							/>
						</div>
						<div className="flex h-full items-center justify-center">
							<p className="max-h-full w-full overflow-auto break-words px-2 text-center text-xs text-gray-800">
								{parsedText.answer}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditablePreview;
