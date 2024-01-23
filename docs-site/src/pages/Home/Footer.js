import React from "react";
import style from "./style/Home.module.css";

export default function Footer() {
  return (
    <>
      <div class={`${style.signupRow} px-2 bg-dark text-light`}>
        <div>
          <h3 class={`${style.rowTitle}`} style={{ fontWeight: 500 }}>
            So signup and start your journey of reporting right now!
          </h3>
          <div class="d-flex justify-content-center py-4">
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

      <div className="p-2">
        <h3>Founder</h3>
        <div className="d-flex justify-content-center">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/mzubairtahir07/"
            className="btn btn-dark d-flex align-items-center justify-content-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              width="18"
              fill="white"
              viewBox="0 0 448 512"
              className="mx-2"
            >
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
            </svg>
            Muhammad Zubair Tahir
          </a>
        </div>
      </div>
    </>
  );
}
