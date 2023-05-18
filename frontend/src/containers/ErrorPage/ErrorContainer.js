import React from "react";
import classes from "./ErrorContainer.module.css";

const ErrorContainer = () => {
  return (
    <div className={classes["error-content"]}>
      <p>Guess!, Something went wrong!</p>
      <p>Please try again later.</p>
    </div>
  );
};

export default ErrorContainer;
