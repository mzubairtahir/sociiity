import React, { useContext, useState } from "react";
import selectedImagesContext from "./context/ImagesContext";

import postCaptionContext from "./context/postCaptionContext";
import locationContext from "./context/LocationContext";
import useFetchWrapper from "../../utils/fetchWrapper";
import {
  useShowMessageApi,
  useShowModelResponse,
} from "../../common/response/ShowResponseProvider";
import CategoryContext from "./context/CategoryContext";

export default function PostUpload() {
  const { selectedImages, setSelectedImages } = useContext(
    selectedImagesContext
  );
  const { selectedLocation, setSelectedLocation } = useContext(locationContext);
  const [uploading, setUploading] = useState(false);
  const showMessageFunc = useShowMessageApi();
  const showModelFunc = useShowModelResponse();
  const fetchFunction = useFetchWrapper();
  const { category } = useContext(CategoryContext);

  const { postCaption, setPostCaption } = useContext(postCaptionContext);

  const resetStaes = () => {
    setPostCaption("");
    setSelectedImages([]);
    setSelectedLocation(null);
  };

  const uploadImagesHandle = async () => {
    if (postCaption.length > 2000) {
      showMessageFunc("Your text characters should not be greater than 2000");
    } else if (postCaption.length === 0) {
      document.getElementById("postText").classList.add("border");
      document.getElementById("postText").classList.add("border-danger");
      setTimeout(() => {
        document.getElementById("postText").classList.remove("border");
        document.getElementById("postText").classList.remove("border-danger");
      }, 3000);
    } else {
      setUploading(true);
      const form = new FormData();
      form.append("category", category)
      form.append("city", selectedLocation.id);

      form.append("content", postCaption);

      for (const image in selectedImages) {
        form.append("media", selectedImages[image]);
      }

      try {
        const resp = await fetchFunction({
          url: "/api/post/makepost",
          method: "post",
          body: form,
          json: false,
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data.status === "ok") {
            showMessageFunc("Uploaded Successfull!");
            resetStaes();
          } else if (data.status === "violation") {
            showModelFunc({
              heading: "Violation!",
              body:
                data.message +
                "<div>Visit our <a href='https://docs.sociiity.com'>community guidelines</a> page to know what type of content you can upload.</div>",
            });
          }
        } else {
          showMessageFunc("Could not uploaded post");
        }

        setUploading(false);
      } catch (error) {
        showMessageFunc("An error occured while posting. Try again later");
      }
    }
  };

  return (
    <>
      <button
        onClick={uploadImagesHandle}
        disabled={
          selectedImages.length === 0 ||
          selectedLocation === null ||
          category.id === "null"
        }
        className="btn btn-info"
      >
        {uploading ? "Posting..." : "Post"}
      </button>
    </>
  );
}
