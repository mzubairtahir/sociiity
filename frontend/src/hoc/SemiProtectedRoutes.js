import React, { useContext} from "react";
import userStateContext from "../states/userStateContext";
import { useNavigate } from "react-router-dom";
import CenterMainComponent from "./CenterMainComponent";
import style from "../css/SemiProtectedRoutes.module.css";
import NavLevelComponent from "./NavLevelComponent";

export default function SemiProtectedRoutes({ Component }) {
  const { user } = useContext(userStateContext);
  const navigate = useNavigate();

  return (
    <>
      <NavLevelComponent>
        <CenterMainComponent>
          {<Component />}
          {!user.isLogin && (
            <>
              <div className={style.authMessage}>
                <h5>
                  Login to react to the posts and see more stories of your city
                </h5>
                <div className="d-flex justify-content-center py-2 align-items-center flex-column">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                  or
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </button>
                </div>
              </div>
            </>
          )}
        </CenterMainComponent>
      </NavLevelComponent>
    </>
  );
}
