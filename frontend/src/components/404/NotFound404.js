import React from "react";
import style from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound404() {

  document.title = "404 - Not found"

  return (
    <div className={style.container}>
      <div>
        <h1>4O4 🕵️‍♂️🚨</h1>
        <h5>
          This page is fighting fake news and will be back soon with the real
          story. Until then, explore more stories at <Link to={""}>sociiity.com</Link> or create your
          own
        </h5>
      </div>
    </div>
  );
}
