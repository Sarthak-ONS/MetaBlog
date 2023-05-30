import React, { useEffect, useState } from "react";
import classes from "./Trending.module.css";
import { AiOutlineBranches } from "react-icons/ai";

import BlogCard from "../../components/BlogCard/BlogCard";
import useHttp from "../../hooks/use-http";

const Trending = () => {
  const [blogs, setBlogs] = useState([]);

  const { isLoading, error, sendRequest: fetchBlogs } = useHttp();

  useEffect(() => {
    const transformBlogs = ({ blogs }) => {
      const loadedBlogs = [];

      blogs.forEach((item) => {
        loadedBlogs.push({
          index: item._id,
          id: item._id,
          authorName: item.author.name,
          title: item.title,
          readTimeText: item.readTime,
          imageUrl: item.image.secure_url,
          dateText: "May 9",
        });
      });
      setBlogs(loadedBlogs);
    };

    fetchBlogs(
      {
        url: "http://localhost:4000/blog/",
      },
      transformBlogs
    );
  }, [fetchBlogs]);

  return (
    <div className={classes["trending"]}>
      <p>
        <span>
          <AiOutlineBranches
            style={{ backgroundColor: "transparent" }}
            color="#fff"
          />
        </span>
        Trending Blog
      </p>
      <br></br>
      <br></br>
      <div className={classes["blog-grid"]}>
        {blogs.map(
          ({
            index,
            id,
            authorName,
            title,
            readTimeText,
            dateText,
            imageUrl,
          }) => (
            <BlogCard
              id={id}
              key={index}
              imageUrl={imageUrl}
              index={index}
              authorName={authorName}
              title={title}
              dateText={dateText}
              readTimeText={readTimeText}
            ></BlogCard>
          )
        )}
      </div>
    </div>
  );
};

export default Trending;
