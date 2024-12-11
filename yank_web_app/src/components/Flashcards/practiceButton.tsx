import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

interface PracticeButtonProps {
	folderId: number;
	onClick: (folderId: number) => void;
}

export function PracticeButton({ folderId, onClick }: PracticeButtonProps) {
	return (
		<button
			className="flex w-fit items-center space-x-2 rounded-md border border-gray-500 px-4 py-2 text-sm text-gray-400 transition hover:bg-gray-700"
			onClick={() => onClick(folderId)}
		>
			<ClipboardDocumentListIcon className="h-4 w-4" />
			<span className="font-medium text-gray-400">Practice</span>
		</button>
	);
}
