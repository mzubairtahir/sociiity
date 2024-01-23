import React from "react";

export default function CenterMainComponent({ children }) {
  return (
    <>
      <div className="main">
        <div className="content d-flex justify-content-center">
          <div className="main-inner">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
