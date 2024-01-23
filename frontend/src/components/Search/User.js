import React from 'react';
import img from "./zubair.jpg";
import style from "./styles/UserResult.module.css";

export default function UserResult({name,id, profile_picture}) {
  return (
    <>
    <div className={`${style.user}`}> 

    <div className='d-flex px-2 align-items-center justify-content-between'>
        <div>
            <img className={`${style.userImage}`} src={profile_picture} alt="preview" />
        </div>
        <div className='text-start lite-white-text px-3 flex-grow-1'>
            <span>{name}</span>
        </div>
        <div>
            <button className={`${style.followBtn}`}>Follow</button>
        </div>
    </div>
    </div>

    </>
  )
}
