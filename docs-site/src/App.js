import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Nav from "./Common/Nav/Nav";
import CommunityGuidelines from "./pages/communityguidelines/CommunityGuidelines";
import HowMakePost from "./pages/HowMakePost/HowMakePost";
import Categories from "./pages/Categories/Categories";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community-guidelines" element={<CommunityGuidelines />} />
        <Route path="/how-make-post" element={<HowMakePost />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
}

export default App;
