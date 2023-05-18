import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
