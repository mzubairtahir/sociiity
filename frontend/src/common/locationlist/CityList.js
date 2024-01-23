import React, {  useEffect, useRef, useState } from "react";
import style from "./LocationModel.module.css";
import useFetchWrapper from "../../utils/fetchWrapper";
import Loading from "../loading/Loading";

function CitySuggestion({ name, id, onchooseFunc }) {
  return (
    <>
      <div
        onClick={() => {
          onchooseFunc({ name, id });
        }}
        className={style.cityOption}
      >
        {name}
      </div>
    </>
  );
}

export default function LocationModel({
  onchooseFunc
}) {
  const [citiesOption, setCitiesOption] = useState([]);
  const [cityInputText, setCityInputText] = useState("");
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const fetchFunction = useFetchWrapper();
  const inputBox = useRef(null);
  const [loading, setLoading] = useState(false);

  const cityInputTextAppender = (event) => {
    setShowNotFoundMessage(false);
    setCityInputText(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      setLoading(true)
      if (cityInputText === "") {
      } else {
        const response = await fetchFunction({
          url: `/api/data/complete_city?value=${cityInputText}`,
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data.length === 0) {
            setCitiesOption([]);
            setShowNotFoundMessage(true);
          } else {
            setCitiesOption(data.data);
          }
        } else {
          setShowNotFoundMessage();
        }
      }
      setLoading(false)

    }

    getData()
  }, [cityInputText]);

  return (
    <div>
      <div>
        <input
          ref={inputBox}
          onInput={cityInputTextAppender}
          type="text"
          id={style.cityInput}
          placeholder="Enter city name..."
          value={cityInputText}
        />
      </div>
      {loading && <div style={{backgroundColor:"black", display: "inline-block"}}>

      <Loading />
      </div>}
      {showNotFoundMessage && (
        <div className="text-dark py-2 text-center">No city found</div>
      )}
      { citiesOption.length!==0 && 
        <div className={style.cityOptionsWrapper}>
          {citiesOption.map((city) => {
            return (
              <CitySuggestion
                onchooseFunc={(value) => {
                  setCityInputText(value.name);
                  onchooseFunc(value);
                  setCitiesOption([]);
                }}
                name={city.name}
                id={city.id}
                key={city.id}
              />
            );
          })}
        </div>
      }
    </div>
  );
}
