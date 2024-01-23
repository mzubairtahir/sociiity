import React from "react";
import style from "./style/Create.module.css";
import MediaSection from "./MediaSection";
import Options from "./options/Options";
import Instructions from "./Instructions";
import InputArea from "./InputArea";
import PostUpload from "./PostUpload";

export default function Create() {
  document.title = "Create";

  return (
    <>
      <div>
        <div className="py-3">
          <div className="lite-white-text position-relative">
            <div className="">
              <div className={`d-flex justify-content-center`}>
                <InputArea />
              </div>
            </div>
          </div>

          <Options />

          <MediaSection />
          <div className="d-flex justify-content-center flex-column align-items-center">
            <div
              className={`opacity-25 m-2 rounded bg-dark ${style.instruction}`}
            >
              <Instructions />
            </div>
            <PostUpload />
          </div>
        </div>
      </div>
    </>
  );
}
