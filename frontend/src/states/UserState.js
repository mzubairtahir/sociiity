import React, {  useState } from "react";
import userStateContext from "./userStateContext";

export default function UserState(props) {
  const [user, setUser] = useState({
    isLogin: false,
    user: null
  });

  return (
    <>
      <userStateContext.Provider value={{ user, setUser }}>
        {props.children}
      </userStateContext.Provider>
    </>
  );
}
