import React, { useRef } from "react";
import SeePasswordEye from "../SeePasswordEye";

export default function FirstStep({
  step,
  setStep,
  setMessage,
  inputvalidation,
}) {
  const passwordElement = useRef(null);
  const confirmPasswordElement = useRef(null);

  const enterHandle = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      changingStepHandle();
    }
  };

  const changingStepHandle = () => {
    if (inputvalidation({ selector: "#firstStep input" }) === true) {
      if (
        passwordElement.current.value === confirmPasswordElement.current.value
      ) {
        setStep(2);
      } else {
        setMessage("Your password do not match");
      }
    }
  };

  return (
    <>
      <div id="firstStep" style={{ display: `${step === 2 ? "none" : ""}` }}>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter email"
            name="email"
            autoComplete="email"
            onKeyDown={enterHandle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <div className="d-flex">
            <input
              ref={passwordElement}
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              autoComplete="off"
              name="password"
              onKeyDown={enterHandle}
            />
            <>
              <SeePasswordEye
                elements={["inputPassword", "inputPasswordConfirm"]}
              />
            </>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputPasswordConfirm">Confirm Password</label>
          <input
            ref={confirmPasswordElement}
            type="password"
            className="form-control"
            id="inputPasswordConfirm"
            placeholder="Re-enter password"
            autoComplete="off"
            onKeyDown={enterHandle}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-dark"
            onClick={changingStepHandle}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
