import React from "react";
import classes from "./LoginPage.module.css";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
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
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
        <p>
          Don't have an account?{" "}
          <NavLink to="auth/signup" className={classes["a2"]}>
            Sign up!
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
