import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { getAuthToken } from "../../utils/auth";

import classes from "./ProfilePage.module.css";
import { useLoaderData } from "react-router-dom";

const ProfilePage = () => {
  const data = useLoaderData();

  console.log(data , "//////////////////");

  return <div className={classes["Profile__Page"]}></div>;
};

export async function loader() {
  const token = getAuthToken();
  console.log(token);
  const response = await fetch("http://localhost:4000/auth/profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    console.log("RESPONSE NOT OKAY");
    const data = { message: "Could not fetch user Profile." };
    throw { isError: true, message: data.message, status: 500 };
  } else {
    return response;
  }
}

export default ProfilePage;
