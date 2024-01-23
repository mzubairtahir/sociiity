import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShowMessageApi } from "../../../common/response/ShowResponseProvider";
import AuthBase from "../AuthBase";
import SecondStep from "./SecondStep";
import FirstStep from "./FirstStep";
import { inputValidation } from "../utils";
import OtherWayAuth from "../OtherWayAuth";
import useFetchWrapper from "../../../utils/fetchWrapper";

export default function Signup() {
  const navigate = useNavigate();
  const showMessageFunc = useShowMessageApi();
  const [makingAccount, setMakingAccount] = useState(false);
  const [step, setStep] = useState(1);
  const fetchFunction = useFetchWrapper();
  document.title = "Signup";

  const onSubmit = async (e) => {
    e.preventDefault();

    if (inputValidation({ selector: "input" })) {
      setMakingAccount(true);

      const formData = new FormData(e.target);
      try {
        const response = await fetchFunction({
          url: "/api/auth/signup",
          body: formData,
          json: false,
          method: "post",
          nonLogin: true,
        });

        if (response.ok) {
          navigate("/login");
          showMessageFunc("Account created successfully!");
        } else if (response.status === 422) {
          const data = await response.json();

          showMessageFunc(data.detail);
        } else {
          showMessageFunc("Something wrong happened");
        }
      } catch (error) {
        showMessageFunc("Something wrong happened");
      }

      setMakingAccount(false);
    }
  };

  return (
    <>
      <AuthBase>
        <form onSubmit={onSubmit}>
          <FirstStep
            inputvalidation={inputValidation}
            step={step}
            setStep={setStep}
            setMessage={showMessageFunc}
          />

          <div>
            <SecondStep
              step={step}
              setStep={setStep}
              makingAccount={makingAccount}
              onSubmit={onSubmit}
            />
          </div>

          <div className="d-flex justify-content-center"></div>
          <div className="d-flex align-items-center flex-column">
            <OtherWayAuth mode="signup" />
          </div>
        </form>
      </AuthBase>
    </>
  );
}
