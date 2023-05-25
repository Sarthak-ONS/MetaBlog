import React, { useState } from "react";
import classes from "./LoginPage.module.css";
import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Loader from "../../components/Loaders/Loader";

const SignupPage = () => {
  const [showLoader, setShowLoader] = useState(false);

  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes["login__container"]}>
      <div className={classes["login-box"]}>
        <p>Create a Account</p>
        {data && data.errors && data.errors && (
          <p className={classes["error__msg"]}>{data.errors.msg}</p>
        )}
        {data && data.status === "ERROR" && (
          <p className={classes["error__msg"]}>{data.errorMessage}</p>
        )}
        <Form method="POST">
          <div className={classes["user-box"]}>
            <label htmlFor="name">Name</label>
            <input required="" name="name" type="text" />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="email">Email</label>
            <input required="" name="email" type="text" />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="password">Password</label>
            <input required="" name="password" type="password" />
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

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:4000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  console.log(response);

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status == 404
  ) {
    return response;
  }

  if (!response.ok) {
    const data = { message: "Could not sign up." };
    throw { isError: true, message: data.message, status: response.status };
  }
  return redirect("/");

  //TODO: Create a new Page for showing user account created.
}

export default SignupPage;
