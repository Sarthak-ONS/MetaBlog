import React from "react";
import classes from "./WriteBlogPage.module.css";

import EditorComponent from "../../components/Editor/EditorComponent";
import { AiOutlineEdit } from "react-icons/ai";
const WriteBlog = () => {
  const publishClickHandler = (value) => {
    console.log("This is from main");
  };

  return (
    <>
      <div className={classes["editor__header"]}>
        <div></div>
        <h1 className={classes["gradient__text"]}>
          Write a new Blog
          <AiOutlineEdit color="white" />
        </h1>
        <button onClick={publishClickHandler}>Publish</button>
      </div>
      <br></br>
      <EditorComponent onClick={publishClickHandler}></EditorComponent>
    </>
  );
};

export default WriteBlog;
