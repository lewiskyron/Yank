import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FolderProps {
  folders: string[]; // Prop to receive folder names
}
const UserFolders: React.FC<FolderProps> = ({ folders }) => {
  // No need for state if just displaying folders passed via props

  return (
    <div className ="flex justify-center mt-6">
        <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a folder" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Folders</SelectLabel>
                {folders.map((folder, index) => (
                    <SelectItem key={index} value={folder}>
                            {folder}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
    </div>
  );
};

export default UserFolders;
