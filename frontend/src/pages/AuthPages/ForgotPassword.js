import React from "react";
import classes from "./LoginPage.module.css";

import Loader from "../../components/Loaders/Loader";

import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

const ForgotPassword = () => {
  const data = useActionData();

  console.log(data, "This is data for forgot Password");

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes["login__container"]}>
      <div className={classes["login-box"]}>
        <p>Forgot Password</p>
        {data && data.status === "SUCCESS" && (
          <p>Email is sent Successfully!</p>
        )}
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

          {isSubmitting && <Loader />}
          {!isSubmitting && (
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          )}
        </Form>
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
  };

  console.log(authData);

  const response = await fetch("http://localhost:4000/auth/forgot", {
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
    const data = { message: "Could not request forgot Password." };
    throw { isError: true, message: data.message, status: response.status };
  }

  return response;
}

export default ForgotPassword;
