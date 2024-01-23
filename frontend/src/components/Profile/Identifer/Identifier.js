import React, { useState } from 'react'
import style from "./Identifier.module.css";
import EditIcon from "../EditIcon"
import EditModel from './EditModel';

export default function Identifier({name, username}) {
  const [showModel, setShowModel] = useState(false);
  const openModel = ()=>{
    setShowModel(true)
  }
  const closeModel = ()=>{
    setShowModel(false)
  }
  return (
    <>
    <div className='d-flex justify-content-center position-relative flex-column align-items-center'>
        <div>
            <span>@{username}</span>
        </div>
        <div>
            <h4 className={style.name}>{name}</h4>
        </div>

        <EditIcon classname={`${style.editIcon}`} onclick={openModel} />
        {showModel && (<EditModel closefunc={closeModel} />)}
          

    </div>
    </>
  )
}
