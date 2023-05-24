import React from "react";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ name, onClick }) => {
  return (
    <div className={styles.card}>
      <div className={styles["card__content"]}>{name}</div>
    </div>
  );
};

export default CategoryCard;
