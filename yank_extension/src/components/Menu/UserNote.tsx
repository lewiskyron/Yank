import React from "react";
import { Textarea } from "@/components/ui/textarea";


type UserNoteProps = {
    note: string;
};

const UserNote:React.FC<UserNoteProps> = () =>{
    return (
      <>
        <div className="flex flex-row ">
          <div className="mr-4 mt-6">
            <p>Note</p>
          </div>
          <Textarea className="w- 1/8" placeholder="Add a note here.." />
        </div>
      </>
    );
}
export default UserNote;