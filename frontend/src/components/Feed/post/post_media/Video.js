import React from "react";
import style from "./style/Video.module.css";

export default function Video({src}) {
  return (
    <>
      <video
        className={` ${style.video}`}
        src={src}
        controls
        alt="test"
        preload="metadata"
        controlsList="nodownload"
      />
    </>
  );
}
