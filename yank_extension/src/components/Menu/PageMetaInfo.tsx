import React, { useEffect, useState } from "react";
import favicon_image from '/highlighter-svgrepo-com.png'
// Defining the page types
type PageMetaInfoProps = {
  title: string;
  favicon: string;
  description: string;
};

//Defining the page meta info component
const PageMetaInfo: React.FC<PageMetaInfoProps> = ({
  title: initialTitle = "",
  favicon: initialFavicon = "",
  description: initialDescription = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [favicon, setFavicon] = useState(initialFavicon);
  const [description, setDescription] = useState(initialDescription);

  const updateTitle = (newTitle: string) =>{
    setTitle(newTitle)
  }
  
   const updateFavicon = (newFavicon: string) =>{
    setFavicon(newFavicon)
  }

   const updateDescription = (newDescription: string) =>{
    setDescription(newDescription)
  }


  const SampleUpdate = () =>{
    updateTitle("custom Title");
    updateDescription("Web Bookmark");
    updateFavicon(favicon_image)
  }

  useEffect(() =>{
    SampleUpdate()
  }
  )
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="my-8 mr-6">
          <img src={favicon} alt="Page favicon" className="w-6 h-6" />
        </div>
        <div className="my-6">
          <h3 className="text-l font-bold">{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default PageMetaInfo;
