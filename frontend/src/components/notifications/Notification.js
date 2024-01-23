import React from "react";
import style from "./style/Notifications.module.css";

export default function Notification({ body, seen }) {
  return (
    <div className={`${style.notification}`}>
      <div className={style.notificationBody}>{body}</div>
      {!seen && <span className={style.dot}></span>}
    </div>
  );
}
