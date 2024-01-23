import { useContext, useEffect } from "react";

import userStateContext from "../states/userStateContext";
import CenterMainComponent from "./CenterMainComponent";
import NavLevelComponent from "./NavLevelComponent";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const { user } = useContext(userStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
    }
  }, []);

  return user.isLogin ? (
    <>
      <NavLevelComponent>
        <CenterMainComponent>
          <Component />
        </CenterMainComponent>
      </NavLevelComponent>
    </>
  ) : null;
};

export default ProtectedRoute;
