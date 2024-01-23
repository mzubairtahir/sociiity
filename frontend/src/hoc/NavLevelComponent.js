import React, { useContext } from "react";
import userStateContext from "../states/userStateContext";
import Nav from "../components/Nav/Nav";

export default function NavLevelComponent({ children }) {
  const { user } = useContext(userStateContext);

  return (
    <>
      {user.isLogin && <Nav />}

      {children}
    </>
  );
}
