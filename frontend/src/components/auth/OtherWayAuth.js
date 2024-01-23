import React from "react";
import GAuth from "./GAuth";
import { Link } from "react-router-dom";
import style from "./style/AuthBase.module.css";

export default function OtherWayAuth({ mode = "login" }) {
  return (
    <>
      <div>
        {mode === "login" ? (
          <>
            Make account? <Link to={"/signup"}>Sign-up</Link>
          </>
        ) : (
          <>
            Already have account? <Link to={"/login"}>Login-in</Link>
          </>
        )}
      </div>
      <div className={style.divider}>
        <span className="mx-2">OR</span>
      </div>
      <GAuth />
    </>
  );
}
