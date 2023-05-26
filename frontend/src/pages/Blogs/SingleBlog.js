import React from "react";
import classes from "./SingleBlog.module.css";
import { useLoaderData } from "react-router-dom";
import {
  BsFillBookmarkFill,
  BsBookmark,
  BsFillShareFill,
} from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

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

const SingleBlog = () => {
  const data = useLoaderData();

  const styles = {
    backgroundImage: `url(${data.blog.image.secure_url})`,
  };

  const blogDate = new Date(data.blog.createdAt);

  const iconSize = 20;

  return (
    <>
      <div className={classes["SingleBlog__header"]}>
        <h1>{data.blog.title}</h1>
        <h4>{data.blog.subtitle}</h4>
        <div className={classes["SingleBlog__header-author__image"]}>
          <img alt="Author Image" src={data.blog.author.image.secure_url} />
          <span>{data.blog.author.name}</span>
          <span>
            <button>Follow</button>
          </span>
        </div>

        <div className={classes["SingleBlog__actions"]}>
          <div className={classes["SingleBlog__actions-like"]}>
            <AiOutlineLike size={iconSize} />
          </div>
          <div className={classes["SingleBlog__actions-bookShare"]}>
            <BsBookmark size={iconSize} />
            <BsFillShareFill size={iconSize} />
          </div>
        </div>

        <p className={classes["SingleBlog__header-date"]}>
          Published on {monthNames[blogDate.getMonth()]} ,{" "}
          {blogDate.getFullYear()}
        </p>
        <div style={styles} className={classes["SingleBlog__coverimage"]} />
        <p className={classes["SingleBlog__header-content"]}>
          {data.blog.content}
        </p>
      </div>
    </>
  );
};

export default SingleBlog;

export async function SingleBlogLoader({ request, params }) {
  const id = params.blogId;

  const response = await fetch("http://localhost:4000/blog/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw { isError: true, message: "Unable to get Blog", status: 404 };
  }

  return response;
}
