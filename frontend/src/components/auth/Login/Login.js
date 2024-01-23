import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeePasswordEye from "../SeePasswordEye";
import AuthBase from "../AuthBase";
import { useShowMessageApi } from "../../../common/response/ShowResponseProvider";
import userStateContext from "../../../states/userStateContext";
import { inputValidation } from "../utils";
import OtherWayAuth from "../OtherWayAuth";
import useFetchWrapper from "../../../utils/fetchWrapper";

export default function Login() {
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const loginButton = useRef(null);
  const showResponseFunc = useShowMessageApi();
  const { setUser } = useContext(userStateContext);
  const fetchFunction = useFetchWrapper();

  document.title = "Login";

  const loginHandle = async (e) => {
    e.preventDefault();
    if (inputValidation({ selector: "input" }) === true) {
      setLoggingIn(true);
      loginButton.current.disabled = true;

      const form = new FormData(e.target);
      try {
        const response = await fetchFunction({
          url: "/api/auth/signin",
          method: "post",
          body: form,
          json: false,
          nonLogin: true
        });

        const responseJson = await response.json();
        if (response.status === 200) {
          setUser({
            isLogin: true,
            user: responseJson.user,
          });
          navigate("/");
        } else if (response.status === 401) {
          if (responseJson.STATUS === "ERROR") {
            showResponseFunc(responseJson.message);
          }
        }
      } catch (error) {
        showResponseFunc("An error occured while logging in");
      }
      loginButton.current.disabled = false;
      setLoggingIn(false);
    }
  };
  return (
    <>
      <AuthBase>
        <form onSubmit={loginHandle}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>

            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="d-flex">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <SeePasswordEye elements={["password"]} />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button ref={loginButton} type="submit" className="btn btn-dark">
              {loggingIn ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className=" my-2 d-flex flex-column align-items-center">
            <div className="my-2">
              <OtherWayAuth />
            </div>
          </div>
        </form>
      </AuthBase>
    </>
  );
}
