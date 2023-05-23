import React from "react";
import classes from "./Header.module.css";
import Lottie from "lottie-react";
import ScannerAnimation from "../../assets/test-scanner.json";

const Header = () => {
  return (
    <div className={classes["header"]}>
      <div className={`${classes["header__text"]}`}>
        <p className={classes["gradient__text"]}>Stay Curious</p>
        <div>
          Discover stories, thinking, and expertise <br></br> from writers on
          any topic.
        </div>
        <span>
          <button className={classes["header__button"]}>Get Started</button>
        </span>
      </div>
      <div className={classes["header__animation-container"]}>
        <Lottie animationData={ScannerAnimation} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default Header;
