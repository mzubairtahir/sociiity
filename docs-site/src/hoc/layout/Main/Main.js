import React from "react";
import style from "./style/Main.module.css";

export default function Main({children}) {
  return (
    <>
      <div className={`d-flex flex-column ${style.mainOuter}`}>
        {children}
      </div>
    </>
  );
}
