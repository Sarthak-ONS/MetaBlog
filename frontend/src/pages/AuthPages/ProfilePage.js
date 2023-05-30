import React from "react";
import { getAuthToken } from "../../utils/auth";

import classes from "./ProfilePage.module.css";
import { useLoaderData } from "react-router-dom";

import BlogCard from "../../components/BlogCard/BlogCard";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ProfilePage = () => {
  const data = useLoaderData();
  console.log(data);

  const joinedDate = new Date(data.user.createdAt);

  const profileImage =
    "https://images.pexels.com/photos/16870215/pexels-photo-16870215/free-photo-of-woman-looking-over-her-sunglasses.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <div className={classes["Profile__Page"]}>
      <div className={classes["Profile__Page-c1"]}>
        {data && data.user && (
          <img src={data.user.image.secure_url || profileImage} />
        )}
        <div className={classes["Profile__Page-c1__name"]}>
          {data.user.name}
        </div>
      </div>
      <div className={classes["Profile__Page-c2"]}>
        <div
          className={`${classes["Profile__Page-c2__joinedDate"]} ${classes["gradient__text"]}`}
        >
          You are member since {monthNames[joinedDate.getMonth()]},{" "}
          {joinedDate.getFullYear()}
        </div>
        <div>
          <label>Email</label>
          <input defaultValue={data.user.email} readOnly />
        </div>

        <div className={classes["User__bookmark"]}>
          <h2>Your Blogs</h2>
          <div className={classes["User__bookmark-bookmarkGrid"]}>
            {data.user_uploaded_blogs.length > 0 &&
              data.user_uploaded_blogs.map((bookmark) => (
                <BlogCard
                  key={bookmark._id}
                  id={bookmark._id}
                  index={bookmark._id}
                  title={bookmark.title}
                  imageUrl={bookmark.image.secure_url}
                  readTimeText={bookmark.readTime}
                />
              ))}
            {data.user_uploaded_blogs.length === 0 && (
              <>
                <p>Please write a blog</p>
              </>
            )}
          </div>
        </div>
        <br></br>
        <div className={classes["User__uploadedBlogs"]}>
          <h2>Bookmarks</h2>
          <div className={classes["User__bookmark-bookmarkGrid"]}>
            {data.user_uploaded_blogs.length > 0 &&
              data.user.bookmarks.map((bookmark) => (
                <BlogCard
                  key={bookmark._id}
                  id={bookmark._id}
                  index={bookmark._id}
                  title={bookmark.title}
                  imageUrl={bookmark.image.secure_url}
                  readTimeText={bookmark.readTime}
                />
              ))}

            {data.user_uploaded_blogs.length === 0 && (
              <>
                <p>Read Blogs</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function loader() {
  const token = getAuthToken();
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
