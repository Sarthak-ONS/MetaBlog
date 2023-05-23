import React from "react";
import classes from "./Trending.module.css";
import { AiOutlineBranches } from "react-icons/ai";

import BlogCard from "../../components/BlogCard/BlogCard";

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
  // {
  //   index: 5,
  //   authorName: "Prajwal Choudhary",
  //   title: "Notes from the underground",
  //   dateText: "May 11",
  //   readTimeText: "2 min read",
  //   imageUrl:
  //     "https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg",
  // },
  // {
  //   index: 6,
  //   authorName: "Sarvesh Algoia",
  //   title: "Zero to One",
  //   dateText: "May 9",
  //   readTimeText: "10 min read",
  //   imageUrl:
  //     "https://images.pexels.com/photos/2156/sky-earth-space-working.jpg",
  // },
];

const Trending = () => {
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
        {DUMMY_BLOG.map(
          ({ index, authorName, title, readTimeText, dateText, imageUrl }) => (
            <BlogCard
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
        {DUMMY_BLOG.map(
          ({ index, authorName, title, readTimeText, dateText, imageUrl }) => (
            <BlogCard
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
