import React from "react";
import classes from "./WriteBlogPage.module.css";

import EditorComponent from "../../components/Editor/EditorComponent";
import { AiOutlineEdit } from "react-icons/ai";
const WriteBlog = () => {
  return (
    <>
      <div className={classes["editor__header"]}>
        <div></div>
        <h1 className={classes["gradient__text"]}>
          Write a new Blog
          <AiOutlineEdit color="white" />
        </h1>
        <button>Publish</button>
      </div>
      <br></br>
      <EditorComponent></EditorComponent>
    </>
  );
};

export default WriteBlog;
