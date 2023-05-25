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
  const response = await fetch("http://localhost:4000/blog/categories");

  if (!response.ok) {
    console.log("RESPONSE NOT OKAY");
    const data = { message: "Could not fetch categories." };
    // throw { isError: true, message: data.message, status: 500 };
    throw json(data, { status: 500 });
  } else {
    return response;
  }
}

export default Category;
