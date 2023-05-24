import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={classes["loading"]}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default Loader;
