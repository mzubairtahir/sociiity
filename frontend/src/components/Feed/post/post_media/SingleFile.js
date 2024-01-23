import React, { useState } from "react";
import style from "./style/SingleFile.module.css"
import Video from "./Video";
import laoder from "../../../../assets/images/loader.gif"

export default function SingleFile({mediaDataDict}) {
  const [showPlaceHolder, setShowPlaceHolder ]  = useState(true);

  return (
    <>
      <div className="single">  
        <div className={`${style.singleFileWrapper}`}>
          {mediaDataDict.file.endsWith(".mp4") ? (
            <Video className={`${style.image}`} src={ mediaDataDict.file} />
          ) : (
            
            <img
            draggable={"false"}
              className={`${style.image}`}
              // src={laoder}
              src={showPlaceHolder?laoder:( mediaDataDict.file)}
              alt="test"
              onLoad={()=>setShowPlaceHolder(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
