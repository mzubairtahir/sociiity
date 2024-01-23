import React, { useContext, useState } from "react";
import MainLayout from "../../hoc/layout/MainLayout";
import CgMain from "./CgMain";
import { useLocation } from "react-router-dom";

export default function CommunityGuidelines() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);


  return (
    <div>
        <MainLayout Main={CgMain} />
    </div>
  );
}
