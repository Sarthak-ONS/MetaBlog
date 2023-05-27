import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { getTokenDuration } from "../utils/auth";

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
