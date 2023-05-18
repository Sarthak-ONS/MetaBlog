import React from "react";
import classes from "./Trending.module.css";
import { AiOutlineBranches } from "react-icons/ai";

import BlogCard from "../../components/BlogCard/BlogCard";

const DUMMY_BLOG = [
  {
    index: 1,
    authorName: "Sarthak Agarwal",
    title: "How to win friends and influence people",
    dateText: "May 5",
    readTimeText: "5 min read",
  },
  {
    index: 2,
    authorName: "Samarth Powell",
    title: "Attitude is Everything",
    dateText: "May 9",
    readTimeText: "2 min read",
  },
  {
    index: 3,
    authorName: "Deepak Rajpoot",
    title: "Sophia - A disturb girl",
    dateText: "May 9",
    readTimeText: "2 min read",
  },
  {
    index: 4,
    authorName: "Priyansh Reddy",
    title: "Licking Ass - Ultimate Guide",
    dateText: "May 9",
    readTimeText: "2 min read",
  },
  {
    index: 5,
    authorName: "Prajwal Choudhary",
    title: "Notes from the underground",
    dateText: "May 11",
    readTimeText: "2 min read",
  },
  {
    index: 6,
    authorName: "Sarvesh Algoia",
    title: "Zero to One",
    dateText: "May 9",
    readTimeText: "10 min read",
  },
];

const Trending = () => {
  return (
    <div className={classes["trending"]}>
      <p>
        <span>
          <AiOutlineBranches
            style={{ backgroundColor: "transparent" }}
            color="#040c18"
          />
        </span>
        Trending Blog Posts
      </p>
      <br></br>
      <br></br>
      <div className={classes["blog-grid"]}>
        {DUMMY_BLOG.map(
          ({ index, authorName, title, readTimeText, dateText }) => (
            <BlogCard
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
