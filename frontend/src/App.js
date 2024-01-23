import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import CreateWrapper from "./components/Create/CreateWrapper";
import Feed from "./components/Feed/Feed";
import Login from "./components/auth/Login/Login";
import ProtectedRoute from "./hoc/ProtectedRoutes";
import Signup from "./components/auth/Signup/Signup";
import Results from "./components/Search/Results";
import NotFound404 from "./components/404/NotFound404";
import PostView from "./components/post view/PostView";
import SemiProtectedRoutes from "./hoc/SemiProtectedRoutes";
import { useContext, useEffect, useState } from "react";
import userStateContext from "./states/userStateContext";
import Loading from "./common/loading/Loading";
import Notifications from "./components/notifications/Notifications";
function App() {
  const { setUser } = useContext(userStateContext);
  const [loading, setLoading] = useState(true);

  const checkSesion = async () => {
    setLoading(true);
    try {
      let response = await fetch("/api/auth/session");

      if (response.ok) {
        const data = await response.json();

        await setUser({
          isLogin: true,
          user: data.user,
        });
      } else {
      }
    } catch (error) {}
    setLoading(false);
  };
  useEffect(() => {
    checkSesion();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Feed} />} />
        <Route path="/user" element={<ProtectedRoute Component={Profile} />} />

        <Route path="/search" element={<ProtectedRoute Component={Search} />}>
          <Route path="searchresults" element={<Results />} />
        </Route>

        <Route
          path="/create"
          element={<ProtectedRoute Component={CreateWrapper} />}
        />
        <Route
          path="/notifications"
          element={<ProtectedRoute Component={Notifications} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/post/:postId"
          element={<SemiProtectedRoutes Component={PostView} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
}

export default App;
