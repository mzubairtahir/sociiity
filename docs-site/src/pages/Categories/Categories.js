import React from "react";
import MainLayout from "../../hoc/layout/MainLayout";
import CategoriesMain from "./CategoriesMain";

export default function Categories() {
  return (
    <>
      <MainLayout Main={CategoriesMain} />
    </>
  );
}
