import React, { useState } from "react";
import style from "./style/MultiFile.module.css";
import Video from "./Video";
import SingleFile from "./SingleFile";

export default function MultiFile({ mediaList }) {
  const [currentMedia, setCurrentMedia] = useState(0);

  const preHandle = () => {
    if (currentMedia === 0) {
    } else {
      setCurrentMedia((pre) => pre - 1);
    }
  };

  const postHandle = () => {
    if (currentMedia === mediaList.length - 1) {
    } else {
      setCurrentMedia((pre) => pre + 1);
    }
  };
  return (
    <>
      <div className={`${style.multiFileWrapper}`}>
        <div>
          <button
            onClick={preHandle}
            id={`${style.pre}`}
            className={`${style.slidingButton}`}
          >
            {"<"}
          </button>
        </div>
        <SingleFile mediaDataDict={mediaList[currentMedia]} />
        <div>
          <button
            onClick={postHandle}
            id={`${style.post}`}
            className={`${style.slidingButton}`}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}
