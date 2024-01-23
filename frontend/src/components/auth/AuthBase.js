import React, { useEffect } from "react";
import style from "./style/AuthBase.module.css";
import logo from "../../assets/images/authlogo.png";

export default function AuthBase({ children }) {
  const setCsrf = async () => {
    const response = await fetch("/api/auth/getcsrf", {
      method: "get",
    });
  };

  useEffect(() => {
    setCsrf();
  }, []);
  return (
    <>
      <div className={style.authOuter}>
        <div
          className={`d-flex justify-content-center align-items-center flex-column`}
        >
          <div className={style.formWrapper}>{children}</div>
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-center my-4 flex-wrap">

        <a target="_blank" className="link-light p-2" href="http://docs.sociiity.com/">About</a>
        <a target="_blank" className="link-light p-2" href="https://docs.sociiity.com/community-guidelines">Community Guidelines</a>
        <a target="_blank" className="link-light p-2" href="https://docs.sociiity.com/categories">Content Categories</a>
        </div>
      </div>
        
    </>
  );
}
