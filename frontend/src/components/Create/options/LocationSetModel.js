import React, { useContext, useEffect, useState } from "react";
import style from "./LocationModel.module.css";
import locationContext from "../context/LocationContext";
import Cross from "../../../assets/icons/Cross";
import LocationModel from "../../../common/locationlist/CityList";


export default function LocationSetModel({ closingFucntion }) {
  const {setSelectedLocation} = useContext(locationContext);

  const onchooseFunc = ({name,id})=>{
    setSelectedLocation({name,id})
    closingFucntion()
  }

  return (
    <div className={style.overlay}>
      <button onClick={()=>closingFucntion()}>
        <Cross/>
      </button>

      <div className={`${style.model} p-4`}>
        <LocationModel onchooseFunc={onchooseFunc}/>
      </div>
    </div>
  );
}
