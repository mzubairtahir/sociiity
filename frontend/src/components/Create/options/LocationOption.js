import React, { useContext, useEffect, useState } from "react";
import style from "./Options.module.css";
import LocationSetModel from "./LocationSetModel";
import locationContext from "../context/LocationContext";

export default function LocationOption() {
  const [showModel, setShowModel] = useState(false);
  const { selectedLocation } = useContext(locationContext);

  return (
    <>
      <div
        className={`${style.option} bg-light rounded-circle`}
        onClick={() => {
          setShowModel(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
      </div>
      {selectedLocation !== null && (
        <div
          className={`${style.showLocationContainer} px-2 d-flex align-items-center font-weight-bold`}
        >
          {selectedLocation.name}
        </div>
      )}

      {showModel && (
        <LocationSetModel
          closingFucntion={() => {
            setShowModel(false);
          }}
        />
      )}
    </>
  );
}
