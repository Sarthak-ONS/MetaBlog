import React from "react";
import classes from "./Category.module.css";

import { AiOutlineBranches } from "react-icons/ai";

const category = [
  { index: 1, name: "Food" },
  { index: 2, name: "Travel" },
  { index: 3, name: "Health and fitness" },
  { index: 4, name: "Lifestyle" },
  { index: 5, name: "Photography" },
  { index: 6, name: "Business" },
  { index: 7, name: "Movie" },
  { index: 8, name: "Political" },
  { index: 9, name: "Religion" },
  { index: 10, name: "Book and writing" },
  { index: 11, name: "Web Development" },
  { index: 12, name: "App Development" },
  { index: 13, name: "Flutter" },
  { index: 14, name: "ReactJS" },
  { index: 15, name: "NodeJS" },
];

const Category = () => {
  return (
    <div className={classes["category"]}>
      <p>
        <span>
          <AiOutlineBranches
            style={{ backgroundColor: "transparent" }}
            color="#fff"
          />
        </span>
        What are you looking for?
      </p>
      {/* This is a list of cards for Category */}
    </div>
  );
};

export default Category;
