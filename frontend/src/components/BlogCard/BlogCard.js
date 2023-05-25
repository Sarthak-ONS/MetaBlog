import React from "react";
import classes from "./BlogCard.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  index,
  authorName,
  title,
  dateText,
  readTimeText,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    index = "646f923644c5f1288f59a941";
    navigate(`/blog/${index}`);
  };

  return (
    <motion.div
      onClick={buttonClickHandler}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.7 }}
      className={classes["card"]}
      initial={{ opacity: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      whileInView={{
        opacity: [0.5, 1],
        scale: 0.95,
        y: [-100, -70, -50, -30, 0],
      }}
      viewport={{ once: true }}
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
