import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { getAuthToken } from "../../utils/auth";

import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const { isLoading, error, sendRequest: fetchProfile } = useHttp();
  const token = getAuthToken();

  useEffect(() => {
    const transformProfile = (data) => {
      console.log(data.user);
      setUser(data.user);
    };

    fetchProfile(
      {
        url: "http://localhost:4000/auth/profile",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      transformProfile
    );
  }, [fetchProfile]);

  return (
    <div className={classes["Profile__Page"]}>
      {!isLoading && user.name && <h2>{user.name}</h2>}
      {!isLoading && user.email && <h2>{user.email}</h2>}
    </div>
  );
};

export default ProfilePage;
