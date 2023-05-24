import React from "react";
import classes from "./ErrorContainer.module.css";

const ErrorContainer = ({ title, message }) => {
  return (
    <div className={classes["error-content"]}>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorContainer;
