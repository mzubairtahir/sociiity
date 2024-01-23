import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./EditModel.module.css";
import useFetchWrapper from "../../../utils/fetchWrapper";
import userStateContext from "../../../states/userStateContext";
import TopMessage from "../../../common/TopMessage";
import otherThanEvent from "../../../common/otherThanClick";
import { useShowMessageApi } from "../../../common/response/ShowResponseProvider";

export default function EditModel({ closefunc }) {
  const inputElement = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const overLay = useRef(null);
  const [uploading, setUploading] = useState(false);
  const fetchFunction = useFetchWrapper();

  const showMessageFunc = useShowMessageApi();

  const { user } = useContext(userStateContext);

  const openMediaSelector = (e) => {
    inputElement.current.click();
  };

  const afterMediaSelection = (e) => {
    const file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      inputElement.value = "";
    } else {
      showMessageFunc(
        "This format is not supported. Supported format ae png, jpg and jpeg"
      );
    }
  };

  const uploadImage = async (e) => {
    setUploading(true)
    const form = new FormData();

    form.append("type", "avatar");
    form.append("profile_picture", image);

    try {
      const response = await fetchFunction({
        url: "/api/user/edit",
        body: form,
        method: "post",
        user: user,
        json: false,
      });

      if (response.ok) {
        showMessageFunc("Profile Picture Updated!");
        closefunc();
      } else {
        showMessageFunc("Could not upload image");
      }
    } catch (error) {
      showMessageFunc("Something wrong happened");
    }

    setUploading(false)
  };

  useEffect(() => {
    otherThanEvent({ onClickFunction: closefunc, onElement: overLay.current });
  });

  return (
    <>
      <div className="overlay" ref={overLay}>
        <div className={style.model}>
          <div className="d-flex flex-column align-items-center">
            <input
              onChange={afterMediaSelection}
              ref={inputElement}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <div>
              <button onClick={openMediaSelector} className="btn btn-info">
                Select
              </button>
            </div>

            <div className="previewer py-4">
              {imagePreview !== null && (
                <img
                  src={imagePreview}
                  className={style.sampleImage}
                  alt="preview"
                />
              )}
            </div>
            {imagePreview !== null && (
              <div>
                <button onClick={uploadImage} className="btn btn-info">
                  {uploading?"Uploading":"Upload"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
