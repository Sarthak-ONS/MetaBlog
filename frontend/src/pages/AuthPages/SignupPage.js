import React from "react";
import classes from "./LoginPage.module.css";

const SignupPage = () => {
  return (
    <div className={classes["login__container"]}>
      <div className={classes["login-box"]}>
        <p>Create a Account</p>
        <form>
          <div className={classes["user-box"]}>
            <input required="" name="" type="text" />
            <label>Name</label>
          </div>
          <div className={classes["user-box"]}>
            <input required="" name="" type="text" />
            <label>Email</label>
          </div>
          <div className={classes["user-box"]}>
            <input required="" name="" type="password" />
            <label>Password</label>
          </div>
          <button>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
        {/* <p>
          Don't have an account?{" "}
          <NavLink to="auth/signup" className={classes["a2"]}>
            Sign up!
          </NavLink>
        </p> */}
      </div>
    </div>
  );
};

export default SignupPage;
