import React, { useContext, useEffect, useState } from "react";
import style from "./style/MediaSection.module.css";
import SelectedMedia from "./SelectedMedia";
import selectedImagesContext from "./context/ImagesContext";

export default function MediaSection() {
  const { selectedImages, setSelectedImages } = useContext(
    selectedImagesContext
  );

  const removeImageFromList = (id) => {
    const updatedImages = selectedImages.filter((_, i) => {

      return i !== id;
    });

    setSelectedImages(updatedImages);
  };




  return (
    
    <>
      <div className="d-flex justify-content-center py-4">
        <div className="w-75">
          <div className="selectedMedia py-4">
            <div className={`d-flex flex-wrap ${style.smwrap}`}>
              {selectedImages.map((img, index) => {
                return (
                  <SelectedMedia
                    rf={removeImageFromList}
                    id={index}
                    key={index}
                    image={img}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
