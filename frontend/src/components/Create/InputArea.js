import React, { useContext, useEffect, useRef } from "react";
import postCaptionContext from "./context/postCaptionContext";
import style from "./style/Create.module.css";

export default function InputArea({}) {
  const { postCaption, setPostCaption } = useContext(postCaptionContext);
  const inputArea = useRef(null);

  return (
    <>
      <textarea
        name="postText"
        id="postText"
        className={`${style.postText}`}
        value={postCaption}
        onChange={(event) => {
          setPostCaption(event.target.value);
        }}
        ref={inputArea}
      ></textarea>
      {postCaption.length === 0 && (
        <span
          className={style.postTextPlaceHolder}
          onClick={() => {
            inputArea.current.focus();
          }}
        >
          Enter post description...
        </span>
      )}
    </>
  );
}
