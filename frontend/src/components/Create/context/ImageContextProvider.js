import React, { useState } from "react";
import selectedImagesContext from "./ImagesContext";

export default function ImageContextProvider({ children }) {
  const [selectedImages, setSelectedImages] = useState([]);
  return (
    <>
      <selectedImagesContext.Provider
        value={{ selectedImages, setSelectedImages }}
      >
        {children}
      </selectedImagesContext.Provider>
    </>
  );
}
