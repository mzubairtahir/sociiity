import React, { useContext, useRef, useState } from "react";
import ShowResponseContext from "./ShowResponseContext";
import style from "./TopMessage.module.css";
import showModelResponseContext from "./showModelResponseContext";
import Cross from "../../assets/icons/Cross";
import style2 from "./ModelMessage.module.css";

export default function ShowResponseProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [modelMessage, setModelMessage] = useState(null);

  const overlay = useRef(null);
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  const showModelMessage = (msg) => {
    setModelMessage(msg);
    window.addEventListener("click", (e) => {
      if (e.target === overlay.current) {
        setModelMessage(null);
      }
    });
  };

  return (
    <ShowResponseContext.Provider value={{ showMessage }}>
      <showModelResponseContext.Provider value={{ showModelMessage }}>
        {children}
        {message !== null && (
          <div className={`${style.messageOuter}`}>
            <div>
              <span>{message}</span>
            </div>
            <div className={`px-3`} onClick={() => setMessage(null)}>
              <Cross />
            </div>
          </div>
        )}

        {modelMessage !== null && (
          <div ref={overlay} className="overlay">
            <div className={style2.model}>
              <div className={style2.modelHeading}>
                <h4>{modelMessage.heading}</h4>
              </div>
              <div
                className={style2.mainConainer}
                dangerouslySetInnerHTML={{ __html: modelMessage.body }}
              ></div>
            </div>
          </div>
        )}
      </showModelResponseContext.Provider>
    </ShowResponseContext.Provider>
  );
}

export const useShowMessageApi = () => {
  const { showMessage } = useContext(ShowResponseContext);
  return (msg) => {
    showMessage(msg);
  };
};

export const useShowModelResponse = () => {
  const { showModelMessage } = useContext(showModelResponseContext);

  return (msg) => {
    showModelMessage(msg);
  };
};
