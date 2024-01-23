import { useGoogleLogin } from "@react-oauth/google";
import style from "./style/AuthBase.module.css";
import useFetchWrapper from "../../utils/fetchWrapper";
import { useShowMessageApi } from "../../common/response/ShowResponseProvider";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import userStateContext from "../../states/userStateContext";

export default function GAuth() {
  const fetchFunction = useFetchWrapper();
  const showMessageFunc = useShowMessageApi();
  const navigate = useNavigate();
  const { setUser } = useContext(userStateContext);
  const [loading, setLoading] = useState(false);

  const handleServerAuth = async (token_response) => {
    setLoading(true);
    try {
      const response = await fetchFunction({
        url: "/api/auth/google_signin",
        method: "post",
        body: JSON.stringify({
          token_response: token_response,
        }),
        nonLogin: true,
      });
      const data = await response.json();
      if (data.STATUS === "OK") {
        setUser({
          isLogin: true,
          user: data.user,
        });
        navigate("/");
      } else {
        if (data.STATUS === "ERROR") {
          showMessageFunc(data.message);
        }
      }
    } catch (error) {
      showMessageFunc("Error occured. Please try again.");
    }
    setLoading(false);
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => handleServerAuth(tokenResponse),
  });

  return (
    <div>
      <button
        type="button"
        className={`${style.login_with_google_btn} btn`}
        onClick={() => login()}
      >
        {loading ? "Wait..." : "Continue with Google"}
      </button>
    </div>
  );
}
