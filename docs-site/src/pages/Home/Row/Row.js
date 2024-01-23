import React from "react";
import style from "./style/Row.module.css";

export default function Row({
  text,
  picture,
  heading,
  type = "left",
  color = "light",
  title = "Hello",
}) {
  return (
    <>
      <div className={color === "dark" && style.darkRow}>
        <h2 class={style.rowTitle}>{title}</h2>
        <div class={`${style.siteRow} ${color === "dark" && style.darkRow}`}>
          {type === "left" ? (
            <>
              <div class={`${style.rowLeft} ${style.siteRowColumn}`}>
                <div>
                  <h3 className={style.heading}>{heading}</h3>
                  <span
                    class={style.leftPara}
                    dangerouslySetInnerHTML={{ __html: text }}
                  ></span>
                </div>
              </div>
              <div class={`${style.siteRowColumn}`}>
                <img class={style.rightImg} src={picture} alt="" />
              </div>
            </>
          ) : (
            <>
              <div class={`${style.siteRowColumn}`}>
                <img class={style.rightImg} src={picture} alt="" />
              </div>
              <div class={`${style.rowLeft} ${style.siteRowColumn}`}>
                <div>
                  <h3 className={style.heading}>{heading}</h3>
                  <span
                    class={style.leftPara}
                    dangerouslySetInnerHTML={{ __html: text }}
                  ></span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
