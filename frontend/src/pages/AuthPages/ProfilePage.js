import React, { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getAuthToken } from "../../utils/auth";

const ProfilePage = () => {
  const { sendRequest: fetchProfile } = useHttp();

  const token = getAuthToken();

  useEffect(() => {
    const transformProfile = (data) => {
      console.log(data.user);
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

  return <div>ProfilePage</div>;
};

export default ProfilePage;
