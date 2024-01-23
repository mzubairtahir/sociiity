import React from "react";
import style from "./style/MainLayout.module.css";

export default function MainLayout({ Main }) {
  return (
    <div className={style.outerContainer}>
      <div className={style.main}>{Main !== undefined && <Main />}</div>
    </div>
  );
}
