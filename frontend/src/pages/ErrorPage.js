import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ErrorContainer from "../containers/ErrorPage/ErrorContainer";

const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ErrorContainer />
    </div>
  );
};

export default ErrorPage;
