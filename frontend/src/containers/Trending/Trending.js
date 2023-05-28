import React, { useEffect, useState } from "react";
import classes from "./Trending.module.css";
import { AiOutlineBranches } from "react-icons/ai";

import BlogCard from "../../components/BlogCard/BlogCard";
import useHttp from "../../hooks/use-http";

const DUMMY_BLOG = [
  {
    index: 1,
    authorName: "Sarthak Agarwal",
    title: "How to win friends",
    dateText: "May 5",
    readTimeText: "5 min read",
    imageUrl:
      "https://images.pexels.com/photos/7562114/pexels-photo-7562114.jpeg",
  },
  {
    index: 2,
    authorName: "Samarth Powell",
    title: "Attitude is Everything",
    dateText: "May 9",
    readTimeText: "2 min read",
    imageUrl:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  },
  {
    index: 3,
    authorName: "Deepak Rajpoot",
    title: "Sophia - A disturb girl",
    dateText: "May 9",
    readTimeText: "2 min read",
    imageUrl:
      "https://images.pexels.com/photos/2156/sky-earth-space-working.jpg",
  },
  {
    index: 4,
    authorName: "Priyansh Reddy",
    title: "Licking Ass - Ultimate Guide",
    dateText: "May 9",
    readTimeText: "2 min read",
    imageUrl:
      "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg",
  },
];

const Trending = () => {
  const [blogs, setBlogs] = useState([]);

  const { isLoading, error, sendRequest: fetchBlogs } = useHttp();

  useEffect(() => {
    const transformBlogs = ({ blogs }) => {
      const loadedBlogs = [];

      console.log(blogs);

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
