import React, { useState } from "react";
import style from "./style/Main.module.css";

export default function DropDown({ question, ansewr }) {
    const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(active?false:true)
  };

  return (
    <>
      <div class={style.dropdown}>
        <div class={style.question} onClick={handleToggle}>
          <h2>{question}</h2>
          <span className="d-flex align-items-center" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              width="25"
              viewBox="0 0 512 512"
            >
              <path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87 87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 345c-9.4 9.4-24.6 9.4-33.9 0L135 241z" />
            </svg>
          </span>
        </div>
        <div class={style.dropdownContent}>
          <div>
            {active && <p>{ansewr}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
