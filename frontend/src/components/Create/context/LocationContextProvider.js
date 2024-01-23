import React, { useState } from "react";
import locationContext from "./LocationContext";

export default function LocationContextProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <>
      <locationContext.Provider
        value={{ selectedLocation, setSelectedLocation }}
      >
        {children}
      </locationContext.Provider>
    </>
  );
}
