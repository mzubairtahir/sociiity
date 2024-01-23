import React, { useContext, useEffect, useRef } from "react";
import style from "./EditModel.module.css";
import useFetchWrapper from "../../../utils/fetchWrapper";
import userStateContext from "../../../states/userStateContext";
import { useShowMessageApi } from "../../../common/response/ShowResponseProvider";

export default function EditModel({ closefunc }) {
  const { user, setUser } = useContext(userStateContext);
  const firstNameElement = useRef(null);
  const secondNameElement = useRef(null);
  const overlay = useRef(null);
  const fetchFunction = useFetchWrapper();
  const showMessageFunc = useShowMessageApi();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target === overlay.current) {
        closefunc();
      }
    });
  }, []);

  const saveHandle = async (e) => {
    e.preventDefault();
    const body = {
      type: "name",
      detail: {
        first_name: firstNameElement.current.value,
        last_name: secondNameElement.current.value,
      },
    };
    if (
      body.detail.first_name.length === 0 ||
      body.detail.last_name.length === 0
    ) {
      showMessageFunc("Fill out both fields");
    } else {
      try {
        const response = await fetchFunction({
          url: "/api/user/edit",
          body: JSON.stringify(body),
          method: "post",
          user: user,
        });
        if (response.ok) {
          showMessageFunc("Name updated");
          closefunc();
        }
      } catch (error) {
        showMessageFunc("Could not update name!");

        closefunc();
      }
    }
  };
  return (
    <>
      <div className="overlay" ref={overlay}>
        <div className={`${style.model}`}>
          <div>
            <form
              onSubmit={saveHandle}
              className="d-flex flex-column align-items-center"
            >
              <div className={`${style.inputsContainer}`}>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  ref={firstNameElement}
                />
              </div>
              <div className={`${style.inputsContainer}`}>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  ref={secondNameElement}
                />
              </div>

              <div className="d-flex flex-column w-75 justify-content-center py-3">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
