import React from "react";
import PageMetaInfo from "./PageMetaInfo";
import UserNote from './UserNote.tsx'
import UserFolders from "./userFolders.tsx";
import TagInput from "./UserTags.tsx";
import { Button } from "@/components/ui/button";


// Define a type for the page details to structure the state
const PageSnapshotComponent: React.FC = () => {
  const folders = ["Inbox", "Archive", "Drafts", "Spam"];
  const availableTags = ["#biology", "#physics", "#mathematics"]
  return (
    <>
      <div className="=flex">
        <PageMetaInfo title={""} favicon={""} description={""} />
        <UserNote note={""} />
        <UserFolders folders={folders} />
        <TagInput availableTags={availableTags} />
        <Button className="justify-center mt-4 bg-indigo-500 hover:bg-indigo-700 ">
          Save
        </Button>
      </div>
    </>
  );
};

export default PageSnapshotComponent;
