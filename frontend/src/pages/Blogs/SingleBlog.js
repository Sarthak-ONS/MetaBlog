import React from "react";
import classes from "./SingleBlog.module.css";

const SingleBlog = () => {
  return <div>SingleBlog</div>;
};

export default SingleBlog;

export async function loader({ request, params }) {
  const id = params.blogId;

  const response = await fetch("http://localhost:4000/blogs/" + id);

  if (!response.ok) {
    
  }
}
