import React from 'react'
import style from "./response/TopMessage.module.css";
import Cross from '../assets/icons/Cross';

export default function TopMessage({messageBody, onclosefunc}) {
  return (
    <div className={`${style.messageOuter}`}>
        <div>

        <span>{messageBody}</span>
        </div>
        <div className={`px-3`} onClick={onclosefunc}>
            <Cross/>
        </div>



      
    </div>
  )
}
