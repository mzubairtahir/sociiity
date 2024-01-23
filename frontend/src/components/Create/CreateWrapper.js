import React from "react";
import Create from "./Create";
import PostCaptionContextProvider from "./context/PostCaptionContextProvider";
import ImageContextProvider from "./context/ImageContextProvider";
import LocationContextProvider from "./context/LocationContextProvider";
import CategoryContextProvider from "./context/CategoryContextProvider";

export default function CreateWrapper() {
  return (
    <CategoryContextProvider>
      <ImageContextProvider>
        <LocationContextProvider>
          <PostCaptionContextProvider>
            <Create />
          </PostCaptionContextProvider>
        </LocationContextProvider>
      </ImageContextProvider>
    </CategoryContextProvider>
  );
}
