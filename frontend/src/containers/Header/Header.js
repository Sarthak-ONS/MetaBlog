import React from "react";
import classes from "./Header.module.css";
import CustomButton from "../../components/Button/CustomButton";
import Lottie from "lottie-react";
import ScannerAnimation from "../../assets/test-scanner.json";

const Header = () => {
  return (
    <div className={classes["header"]}>
      <div className={classes["header__text"]}>
        <p>Stay Curious</p>
        <div>
          Discover stories, thinking, and expertise <br></br> from writers on
          any topic.
        </div>
        <p>
          <CustomButton text={"Get Started"} color={"var(--color-text)"} />
        </p>
      </div>
      <div className={classes["header__animation-container"]}>
        <Lottie animationData={ScannerAnimation} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default Header;
