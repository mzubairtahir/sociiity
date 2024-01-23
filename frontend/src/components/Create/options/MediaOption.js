import React, { useContext, useEffect, useRef, useState } from "react";
import selectedImagesContext from "../context/ImagesContext";
import style from "./Options.module.css";
import { useShowMessageApi } from "../../../common/response/ShowResponseProvider";

export default function MediaOption() {
  const input = useRef(null);
  const showMessageFunc = useShowMessageApi();

  const { selectedImages, setSelectedImages } = useContext(
    selectedImagesContext
  );

  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const temporaryUrl = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.src = temporaryUrl;
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.onerror = () => {
        reject(null);
      };
      video.preload = "metadata";
    });
  };

  const validateFiles = async (filesList) => {
    for (const file of Array.from(filesList)) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "video/mp4"
      ) {
      } else {
        showMessageFunc(
          " This file is not supported. Valid Formats are png, jpg, jpeg or mp4"
        );
        throw new Error();
      }
      if (file.size / 1000000 > 100) {
        showMessageFunc(" Your each file should not be greate than 100 Mb");
        throw new Error();
      }
      if (file.type === "video/mp4") {
        const duration = await getVideoDuration(file);
        if (duration > 600) {
          showMessageFunc("Your video file should be less than 10 minutes");
          throw new Error();
        }
      }
    }
  };

  const uploadHandler = async (event) => {
    let selectedFiles = event.target.files;
    if (
      selectedFiles.length > 3 ||
      selectedImages.length + selectedFiles.length > 3
    ) {
      showMessageFunc("You can upload only three files");
    } else {
      try {
         await validateFiles(selectedFiles);
        setSelectedImages(selectedImages.concat(Array.from(selectedFiles)));
      } catch (error) {
        selectedFiles = [];
      }
    }
  };

  const openFiles = (event) => {
    input.current.value = "";
    input.current.click();
  };

  return (
    <>
      <div
        className={` ${style.option} bg-light rounded-circle`}
        title="add media"
        onClick={openFiles}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.2em"
          viewBox="0 0 512 512"
        >
          <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
        </svg>
      </div>
      <input
        multiple
        ref={input}
        type="file"
        accept="image/*, video/*"
        style={{ display: "none" }}
        onChange={uploadHandler}
      />
    </>
  );
}
