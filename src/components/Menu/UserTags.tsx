import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TagInputProps {
  availableTags: string[];
}

const TagInput: React.FC<TagInputProps> = ({ availableTags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center mt-4 mr-12">
        <div className="mr-4 mt-2">
          <p>Tags</p>
        </div>
        <div>
          <Input
            placeholder="Add a tag..."
            onFocus={() => setIsOpen(true)}
            ref={inputRef}
          />
        </div>
        {isOpen && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button style={{ display: "none" }}>Open</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {availableTags.map((tag, index) => (
                <DropdownMenuItem key={index} onSelect={() => console.log(tag)}>
                  {tag}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};

export default TagInput;
