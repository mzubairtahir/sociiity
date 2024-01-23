import React, { useState } from "react";
import style from "./styles/Search.module.css";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  document.title = "Search";

  const navigate = useNavigate();

  const controllingInputHandle = (event) => {
    setSearchText(event.target.value);
  };

  const searchFunction = () => {
    if (searchText.length === 0) {
    } else {
      navigate(`searchresults?q=${searchText}`);
    }
  };

  return (
    <>
      <div className={` py-3 flex-grow-1 ${style.searchMain} search`}>
        <div className="d-flex justify-content-center">
          <input
            autoFocus
            placeholder="Search from whole Pakistan"
            className={`${style.searchInput} w-75`}
            type="text"
            onInput={controllingInputHandle}
            value={searchText}
          />
          <div
            className={`${style.searchButtonWrapper} p-2 px-3`}
            onClick={searchFunction}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
}
