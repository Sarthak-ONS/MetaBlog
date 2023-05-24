import React from "react";
import classes from "./Category.module.css";

import CategoryCard from "../../components/CategoryCard/CategoryCard";

import { AiOutlineBranches } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";

const Category = () => {
  const data = useLoaderData();

  return (
    <>
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

        <CategoriesGrid />
      </div>
    </>
  );
};

const CategoriesGrid = () => {
  const data = useLoaderData();

  return (
    <div className={classes["category__grid"]}>
      {data.map((item) => (
        <CategoryCard key={item.index} name={item.name}></CategoryCard>
      ))}
    </div>
  );
};

export async function loader() {
  const response = await fetch("http://localhost:4000/blogs/categories");

  if (!response.ok) {
    //.,,,,,
  } else {
    const resData = await response.json();

    console.log(resData);
    return resData.categories;
  }
}

export default Category;
