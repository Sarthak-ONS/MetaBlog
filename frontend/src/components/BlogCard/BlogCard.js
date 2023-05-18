import React from "react";
import classes from "./BlogCard.module.css";

const BlogCard = ({ index, authorName, title, dateText, readTimeText }) => {
  return (
    <div className={classes["card"]}>
      <div className={classes["card__index"]}>{index}</div>
      <div>
        <p className={classes["card__authorName"]}>{authorName}</p>
        <p className={classes["card__title"]}>{title}</p>
        <p className={classes["card__date-read"]}>
          {dateText} - {readTimeText}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
