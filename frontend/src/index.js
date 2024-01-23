import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UserState from "./states/UserState";
import ShowResponseProvider from "./common/response/ShowResponseProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId = process.env.REACT_APP_GAUTH_ID;

root.render(
  <UserState>
    <React.StrictMode>
      <BrowserRouter>
        <ShowResponseProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </ShowResponseProvider>
      </BrowserRouter>
    </React.StrictMode>
  </UserState>
);
reportWebVitals();
