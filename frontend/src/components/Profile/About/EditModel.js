import React, { useEffect, useRef, useState } from "react";
import style from "./EditModel.module.css";
import otherThanEvent from "../../../common/otherThanClick";
import CityList from "../../../common/locationlist/CityList";
import useFetchWrapper from "../../../utils/fetchWrapper";
import { useShowMessageApi } from "../../../common/response/ShowResponseProvider";

export default function EditModel({ closingFunc }) {
  const [city, setCity] = useState(null);
  const areaInput = useRef(null);
  const fetchFunction = useFetchWrapper();
  const showMessageFunc = useShowMessageApi();
  const [loading, setLoading] = useState(false);

  const overlay = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (city === null || areaInput.current.value.length === 0) {
    } else {
      try {
        const response = await fetchFunction({
          url: "/api/user/edit",
          method: "post",
          json: true,
          body: JSON.stringify({
            type: "ca",
            detail: {
              city: city.id,
              area: areaInput.current.value,
            },
          }),
        });

        if (response.ok) {
          showMessageFunc("Location updated");
          closingFunc();
        } else {
          showMessageFunc("Could not update location.");
          closingFunc();
        }
      } catch (error) {
        showMessageFunc("Could not update location.");
        closingFunc();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    otherThanEvent({
      onElement: overlay.current,
      onClickFunction: closingFunc,
    });
  });
  return (
    <>
      <div ref={overlay} className="overlay">
        <div className={style.model}>
          <div className="text-info text-center">
            Your address will not be shared with anyone. We will use it to show
            you posts of your area and city.
          </div>
          <div>
            <form
              onSubmit={onSubmit}
              action=""
              className="d-flex flex-column align-items-center"
            >
              <div>
                <div className="py-2">
                  <CityList
                    onchooseFunc={(value) => {
                      setCity(value);
                    }}
                  />
                </div>
              </div>
              <div className="py-2">
                <input
                  ref={areaInput}
                  type="text"
                  placeholder="Enter your area"
                  required
                />
              </div>
              <div>
                <button className="btn btn-dark">
                  {loading ? "Saving" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
