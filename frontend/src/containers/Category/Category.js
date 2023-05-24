import React from "react";
import classes from "./Category.module.css";

import CategoryCard from "../../components/CategoryCard/CategoryCard";

import { AiOutlineBranches } from "react-icons/ai";
import { json, useLoaderData } from "react-router-dom";

const Category = () => {
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

  const styles = {
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    padding: "2rem",
  };

  if (data.isError) {
    console.log(data.message);
    return <h5 style={styles}>{data.message}</h5>;
  }

  const categories = data.categories;

  return (
    <div className={classes["category__grid"]}>
      {categories.map((item) => (
        <CategoryCard key={item.index} name={item.name}></CategoryCard>
      ))}
    </div>
  );
};

export async function loader() {
  const response = await fetch("http://localhost:4000/blogs/categories");

  if (!response.ok) {
    return json(
      { message: "Could not fetch categories" },
      {
        status: 404,
      }
    );
  } else {
    return response;
  }
}

export default Category;
