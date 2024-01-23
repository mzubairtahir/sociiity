import React from 'react'
import style from "./EditIcon.module.css";
import PencilIcon from '../../assets/icons/PencilIcon';

export default function EditIcon({classname='', onclick}) {
  return (
    <>
    <div onClick={onclick} className={`${style.editWrapper} ${classname}`}>
            <PencilIcon fill={"black"} className={""} />
          </div>
    </>
  )
}
