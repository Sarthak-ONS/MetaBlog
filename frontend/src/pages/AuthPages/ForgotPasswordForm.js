import React from "react";
import classes from "./LoginPage.module.css";

import Loader from "../../components/Loaders/Loader";

import { Form, useActionData, useNavigation } from "react-router-dom";

const ForgotPasswordForm = () => {
  const data = useActionData();

  console.log(data, "This is data for forgot Password");

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes["login__container"]}>
      <div className={classes["login-box"]}>
        <p>Changed Password</p>
        {data && data.status === "SUCCESS" && (
          <p>Password is Changed Successfully!</p>
        )}
        {data && data.errors && data.errors && (
          <p className={classes["error__msg"]}>{data.errors.msg}</p>
        )}
        {data && data.status === "ERROR" && (
          <p className={classes["error__msg"]}>{data.errorMessage}</p>
        )}
        <Form method="POST">
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
      </div>
    </div>
  );
};

export async function action({ request, params }) {
  const data = await request.formData();

  console.log(params);
  const token = params.token;

  const authData = {
    password: data.get("password"),
  };

  const response = await fetch(
    "http://localhost:4000/auth/password/reset/" + token,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  );

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

export default ForgotPasswordForm;
