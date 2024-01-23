import React, { useContext, useEffect, useState } from "react";
import style from "./Options.module.css";
import useFetchWrapper from "../../../utils/fetchWrapper";
import CategoryContext from "../context/CategoryContext";

export default function CategoriesList() {
  const [options, setOptions] = useState([]);
  const fetchFunction = useFetchWrapper();
  const { category, setCategory } = useContext(CategoryContext);

  const onChangeCategoryHandle = (event)=>{
    setCategory(event.target.value);

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction({
          url: "/api/data/get_categories",
        });
        const data = await response.json();
        if (data.STATUS === "OK") {
          setOptions(data.DATA);
        }
      } catch (error) {}
    };
    if (options.length === 0) {
      fetchData();
    }
  }, [options]);

  return (
    <>
      <select
        name="category"
        id="category"
        onChange={onChangeCategoryHandle}
        className={style.select}
        defaultValue="null"
      >
        <option value="null">
          Select Category
        </option>
        {options.length !== 0 && (
          <>
            {options.map((dict) => {
              return <option key={dict.id} value={dict.id}>{dict.value}</option>;
            })}
          </>
        )}
      </select>
    </>
  );
}
