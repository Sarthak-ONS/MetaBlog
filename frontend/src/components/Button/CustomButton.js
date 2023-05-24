import React, { useState } from "react";
import classes from "./CustomButton.module.css";

const CustomButton = ({ text, color, onClick }) => {
  const onClickHandler = () => {
    onClick();
  };

  return (
    <button
      className={classes["action__button"]}
      style={{
        backgroundColor: color !== "var(--color-text)" ? "#040c18" : "#fff",
        color: color === "var(--color-text)" ? "#040c18" : "#fff",
      }}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};

export default CustomButton;
