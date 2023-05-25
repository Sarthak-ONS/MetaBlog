import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ErrorContainer from "../containers/ErrorPage/ErrorContainer";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "An error occured!";
  let message = "Something went wrong!";

  // message = error.data.message;

  // if (error.status === 404) {
  //   title = "Not Found!";
  //   message = "Could not find resource or page";
  // }

  return (
    <div>
      <Navbar></Navbar>
      <ErrorContainer title={title} message={error.message} />
    </div>
  );
};

export default ErrorPage;
