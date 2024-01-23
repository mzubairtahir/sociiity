import React, { useState } from "react";
import CategoryContext from "./CategoryContext";

export default function CategoryContextProvider({ children }) {
  const [category, setCategory] = useState({
    id: "null"
  });
  return (
    <>
      <CategoryContext.Provider value={{ category, setCategory }}>
        {children}
      </CategoryContext.Provider>
    </>
  );
}
