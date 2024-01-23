import React from "react";
import style from "./style/Home.module.css";

export default function Hero() {
  return (
    <>
      <div class={style.topContainer}>
        <div class={style.hero}>
          <div class="d-flex justify-content-center align-items-center flex-wrap">
            <div class="d-flex justify-conten-center"></div>
            <div class={style.heroTitle}>
              <h1>Capture. Share. Expose</h1>
              <div class={style.secondTitle}>
                <span>
                  It's time to expose every hidden wrongdoing from every corner
                  of Pakistan
                </span>
              </div>
            </div>
            <div></div>
          </div>
          <div class="py-3">
            <a href="https://sociiity.com/signup">
              <button
                class={`btn btn-light p-3 font-weight-bold ${style.shakeAnimation}`}
              >
                Signup
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
