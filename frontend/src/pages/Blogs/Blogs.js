import React, { useState, useEffect } from "react";
import classes from "./Blogs.module.css";
import useHttp from "../../hooks/use-http";
import BlogCard from "../../components/BlogCard/BlogCard";


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("food");

  const { sendRequest: fetchBlogs } = useHttp();
  const { sendRequest: fetchCategories } = useHttp();

  const categoriesChangeHandler = (event) => {
    const category = event.target.value;
    console.log(categories[category - 1].name);
    setCategory(categories[category - 1].name);
  };

  useEffect(() => {
    const transformBlogs = ({ blogs }) => {
      const loadedBlogs = [];

      blogs.forEach((item) => {
        loadedBlogs.push({
          index: item._id,
          id: item._id,
          authorName: item.author.name,
          title: item.title,
          readTimeText: item.readTime,
          imageUrl: item.image.secure_url,
          dateText: "May 9",
        });
      });
      setBlogs(loadedBlogs);
    };

    fetchBlogs(
      {
        url: "http://localhost:4000/blog?category=" + category,
      },
      transformBlogs
    );
  }, [fetchBlogs, category]);

  // Categories useEffect
  useEffect(() => {
    const transformCategories = ({ categories }) => {
      const loadedCategories = [];

      categories.forEach((item) => {
        loadedCategories.push({ index: item.index, name: item.name });
      });

      setCategories(loadedCategories);
    };

    fetchCategories(
      {
        url: "http://localhost:4000/blog/categories",
      },
      transformCategories
    );
  }, [fetchCategories]);

  return (
    <div className={classes["Blogs__container"]}>
      <div>
        <select onChange={categoriesChangeHandler}>
          {categories.map((item) => (
            <option key={item.index} value={item.index} name={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes["blog-grid"]}>
        {blogs.map(
          ({
            index,
            id,
            authorName,
            title,
            readTimeText,
            dateText,
            imageUrl,
          }) => (
            <BlogCard
              id={id}
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

export default Blogs;
