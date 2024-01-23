import React from "react";
import useFetchWrapper from "../../utils/fetchWrapper";
import { useNavigate } from "react-router-dom";
import { useShowMessageApi } from "../../common/response/ShowResponseProvider";

export default function Logout() {
  const fetchFunction = useFetchWrapper();
  const navigate = useNavigate();
  const ShowResponseFunc = useShowMessageApi();

  const onLogoutClick = async () => {
    try {
      const response = await fetchFunction({ url: "/api/auth/logout" });

      if (response.ok) {
        navigate("/login");
      } else {
        ShowResponseFunc(
          "Could not logout. Please try again or refresh the page"
        );
      }
    } catch (error) {
      ShowResponseFunc("Something went wrong");
    }
  };

  return (
    <div className="p-2">
      <button onClick={onLogoutClick} className="btn btn-light">Logout</button>
    </div>
  );
}
