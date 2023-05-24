import React, { useState } from "react";
import classes from "./LoginPage.module.css";
import { NavLink } from "react-router-dom";

import Loader from "../../components/Loaders/Loader";

const LoginPage = () => {
  const [showLoader, setShowLoader] = useState(false);

  const loginghandler = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  };

  return (
    <>
      <div className={classes["login-box"]}>
        <p>Login</p>
        <form>
          <div className={classes["user-box"]}>
            <input required="" name="" type="text" />
            <label>Email</label>
          </div>
          <div className={classes["user-box"]}>
            <input required="" name="" type="password" />
            <label>Password</label>
          </div>
          {showLoader && <Loader />}
          {!showLoader && (
            <button href="" onClick={loginghandler}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          )}
        </form>
        <p>
          Don't have an account?{" "}
          <NavLink to="/auth/signup" className={classes["a2"]}>
            Sign up!
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
