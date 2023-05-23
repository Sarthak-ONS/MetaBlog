import React from "react";
import classes from "./Category.module.css";

import { AiOutlineBranches } from "react-icons/ai";

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
    </div>
  );
};

export default Category;
