import React from "react";
import classes from "./BlogCard.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  id,
  index,
  authorName,
  title,
  dateText,
  readTimeText,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <motion.div
      onClick={buttonClickHandler}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      className={classes["card"]}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      <img alt="" src={imageUrl}></img>
      <div className={classes["card-content"]}>
        <p className={classes["card__authorName"]}>{authorName}</p>
        <p className={classes["card__title"]}>{title}</p>
        <p className={classes["card__date-read"]}>
          {dateText} - {readTimeText}
        </p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
