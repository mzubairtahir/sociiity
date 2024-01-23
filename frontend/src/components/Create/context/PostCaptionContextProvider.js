import React, { useState } from "react";
import postCaptionContext from "./postCaptionContext";

export default function PostCaptionContextProvider({ children }) {
  const [postCaption, setPostCaption] = useState("");

  return (
    <>
      <postCaptionContext.Provider value={{ postCaption, setPostCaption }}>
        {children}
      </postCaptionContext.Provider>
    </>
  );
}
