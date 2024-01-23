import React, { useEffect, useRef, useState } from "react";
import style from "./styles/Results.module.css";
import MediaResults from "./MediaResults";
import { useLocation } from "react-router-dom";
import LocationModel from "../../common/locationlist/CityList";
import otherThanEvent from "../../common/otherThanClick";
import Cross from "../../assets/icons/Cross";

export default function Results() {
  const [showUpButton, setShowUpButton] = useState(true);
  const [filter, setFilter] = useState(null);
  const [showAddCityModel, setShowAddCityModel] = useState(false);
  const overlay = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    otherThanEvent({
      onElement: overlay.current,
      onClickFunction: () => {
        setShowAddCityModel(false);
      },
    });
  }, [showAddCityModel]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop } = document.documentElement;

      if (scrollTop >= 50) {
        setShowUpButton(true);
      } else {
        setShowUpButton(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [queryParams.get("q")]);

  return (
    <>
      <div className="searchResultContainer">
        <div className="p-2 lite-white-text d-flex justify-content-between">
          <h4>Results</h4>

          <div className={`${style.changeCityWrapper} d-flex flex-column`}>
            <button
              onClick={() => setShowAddCityModel(true)}
              className="btn btn-light"
            >
              City filter
            </button>
          </div>
        </div>
        {filter !== null && (
          <div className="px-2 d-flex justify-content-end align-items-center">
            <div className={`${style.crossWrapper}`} onClick={()=>setFilter(null)}>
              <Cross />
            </div>
            <span className={`${style.filterValue}`}>{filter}</span>
          </div>
        )}
        <div className="d-flex justify-content-center">
          <div className="w-50 d-flex justify-content-between"></div>
        </div>

        <div className="results py-4 px-2">
          <MediaResults cityFilter={filter} q={queryParams.get("q")} />
        </div>
      </div>

      {showUpButton && (
        <>
          <div
            className={`${style.upWrapper}`}
            onClick={() => (document.documentElement.scrollTop = 0)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
          </div>
        </>
      )}

      {showAddCityModel && (
        <div ref={overlay} className="overlay">
          <div className={style.addCityModel}>
            <LocationModel
              onchooseFunc={({ name, id }) => {
                setFilter(name);
                setShowAddCityModel(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
