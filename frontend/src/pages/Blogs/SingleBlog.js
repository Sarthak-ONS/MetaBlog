import React from "react";
import classes from "./SingleBlog.module.css";
import { useLoaderData } from "react-router-dom";

const SingleBlog = () => {
  const data = useLoaderData();
  console.log(data, "//////////");

  return <div>SingleBlog</div>;
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
