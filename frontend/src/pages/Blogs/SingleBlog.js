import React, { useEffect, useState } from "react";
import classes from "./SingleBlog.module.css";
import { useLoaderData, useParams } from "react-router-dom";

import {
  BsFillBookmarkFill,
  BsBookmark,
  BsFillShareFill,
} from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const SingleBlog = () => {
  const [isBookMarked, setIsBookMarked] = useState(false);

  const data = useLoaderData();

  const styles = {
    backgroundImage: `url(${data.blog.image.secure_url})`,
  };

  const blogDate = new Date(data.blog.createdAt).toLocaleDateString();

  const bookMarkHandler = () => {};

  // useEffect(() => {
  //   return () => {};
  // }, [isBookMarked]);

  return (
    <>
      <div className={classes["SingleBlog__header"]}>
        <div style={styles} className={classes["SingleBlog__coverimage"]} />
        <div className={classes["SingleBlog__header-author__image"]}>
          <img alt="Author Image" src={data.blog.author.image.secure_url} />
        </div>

        <div className={classes["SingleBlog__actions"]}>
          <div></div>
          <h1>{data.blog.title}</h1>
          <div className={classes["SingleBlog__actions-buttons"]}>
            {isBookMarked && <BsBookmark size={15} />}
            {!isBookMarked && <BsFillBookmarkFill size={15} />}
            <BsFillShareFill size={15} />
          </div>
        </div>
        <p className={classes["SingleBlog__header-authorname"]}>
          By - <span>{data.blog.author.name}</span>
        </p>
        <p className={classes["SingleBlog__header-date"]}>{blogDate}</p>
        <p className={classes["SingleBlog__header-content"]}>
          {data.blog.content}
        </p>
      </div>
    </>
  );
};

export default SingleBlog;

function checkIsBookMarked() {}

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
