import React, { useState, ChangeEvent } from "react";
import { Edit, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface EditablePreviewProps {
  initialText: string;
}

const EditablePreview: React.FC<EditablePreviewProps> = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(initialText);

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
    <div className="relative max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {isEditing ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Editing</h2>
            <button
              onClick={handleSaveClick}
              className="flex items-center px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Save className="mr-1 h-4 w-4" />
              Save
            </button>
          </div>
          <Textarea
            value={text}
            onChange={handleTextChange}
            className="mt-3"
          />
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={handleEditClick}
            className="absolute top-0 right-0 mt-2 mr-2 flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Edit className="mr-1 h-4 w-4" />
            Edit
          </button>
          <p className="text-gray-800 whitespace-pre-wrap">{text}</p>
        </div>
      )}
    </div>
  );
};

export default EditablePreview;
