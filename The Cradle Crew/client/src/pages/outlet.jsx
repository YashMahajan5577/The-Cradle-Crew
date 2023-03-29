import React from "react";
import { Outlet } from "react-router-dom";

import Banner from "../components/banner";
import NavHeader from "../components/navheader";
const outlet = () => {
  return (
    <div>
      <Banner />
      <NavHeader />

      <Outlet />
    </div>
  );
};

export default outlet;
