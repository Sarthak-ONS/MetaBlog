import React from "react";
import classes from "./LoginPage.module.css";
import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

import Loader from "../../components/Loaders/Loader";

const LoginPage = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes["login__container"]}>
      <div className={classes["login-box"]}>
        <p>Login to MetaBlog</p>
        {data && data.errors && data.errors && (
          <p className={classes["error__msg"]}>{data.errors.msg}</p>
        )}
        {data && data.status === "ERROR" && (
          <p className={classes["error__msg"]}>{data.errorMessage}</p>
        )}
        <Form method="POST">
          <div className={classes["user-box"]}>
            <label htmlFor="email">Email</label>
            <input required name="email" type="text" />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="password">Password</label>
            <input required name="password" type="password" />
          </div>

          {isSubmitting && <Loader />}
          {!isSubmitting && (
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          )}
        </Form>
        <p className={classes["forgotPassword"]}>
          <NavLink to="/auth/forgot" className={classes["a2"]}>
            Forgot Password?
          </NavLink>
        </p>
        <p>
          Don't have an account?{" "}
          <NavLink to="/auth/signup" className={classes["a2"]}>
            Sign up!
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 404
  ) {
    return response;
  }

  if (!response.ok) {
    const data = { message: "Could not authenticate user." };
    throw { isError: true, message: data.message, status: response.status };
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  localStorage.setItem("expiration", expirationDate.toISOString());

  return redirect("/");
}

export default LoginPage;
