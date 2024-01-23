import React, { useState } from "react";
import style from "./ProfilePicture.module.css";
import EditIcon from "../EditIcon";
import EditModel from "./EditModel";


export default function ProfilePicture({pictureSrc}) {
  const [showModel, setShowModel] = useState(false);

  const openModel = ()=>{
    setShowModel(true)
  }

  const closeModel = ()=>{
    setShowModel(false)
  }


  return (
    <>
      <div className="d-flex justify-content-center">
        <div className={`position-relative`}>
          <div className={style.picWrap}>

          <img
            // src={pic}
            src={pictureSrc}
            alt="Muhammad Zubair Tahir"
            className={style.picture}
          />
          </div>

          <EditIcon classname={style.editIcon} onclick={openModel}/>
          {showModel && <EditModel closefunc={closeModel}/>}
        </div>
      </div>
    </>
  );
}
