import { useContext } from "react";
import { useHistory } from "react-router-dom";
import userStateContext from "../states/userStateContext";

// Function to get the value of a specific cookie by name
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Custom hook for making authenticated API requests
export default function useFetchWrapper() {
  const { user } = useContext(userStateContext);
  const history = useHistory();

  return ({ url, body = undefined, json = true, method = "get", headers = {}, nonLogin = false, ...args }) => {
    // Set headers for POST requests, including CSRF token
    if (method === "post") {
      if (json) {
        headers["Content-Type"] = "application/json";
      }
      headers["X-CSRFToken"] = getCookie("csrftoken");
    }

    let options = {
      method: method,
      headers: headers,
      ...args,
    };

    // Include request body for POST requests
    if (method === "post") {
      options["body"] = body;
    }

    // Check if the request can be made without user authentication
    if (nonLogin) {
      return fetch(url, options);
    } else {
      // Check if the user is logged in before making the request
      if (user !== undefined && user.isLogin) {
        return fetch(url, options);
      } else {
        // Redirect to login page if user is not logged in
        history.push("/login");
        return null;
      }
    }
  };
}
