import React, { useRef } from "react";
import MediaOption from "./MediaOption";
import LocationOption from "./LocationOption";
import style from "./Options.module.css";
import CategoriesList from "./CategoriesList";

export default function Options() {
  return (
    <>
      <div>
        <div className=" py-2 px-4">
          <div className="d-flex">
            <MediaOption />
            <LocationOption />
          </div>
          <div className="my-2">

          </div>
          <CategoriesList />
        </div>
      </div>
    </>
  );
}
