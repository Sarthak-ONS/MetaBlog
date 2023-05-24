import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
