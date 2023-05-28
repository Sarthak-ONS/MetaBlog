import React, { useState } from "react";
import classes from "./WriteBlogPage.module.css";
import PublishForm from "../../components/PublishForm/PublishForm";

import { getAuthToken } from "../../utils/auth";

import EditorComponent from "../../components/Editor/EditorComponent";
import { AiOutlineEdit } from "react-icons/ai";
import { redirect } from "react-router-dom";
const WriteBlog = () => {
  const publishClickHandler = (value) => {
    openPublishFormHandler();
  };

  const [showPublishForm, setShowPublishForm] = useState(false);

  const openPublishFormHandler = () => {
    setShowPublishForm(true);
  };
  const closePublishFormHandler = () => {
    setShowPublishForm(false);
  };

  const getContent = (value) => {
    console.log(value);
    setContent(value);
  };

  const [content, setContent] = useState("");

  return (
    <>
      {showPublishForm && (
        <PublishForm
          content={content}
          onClose={closePublishFormHandler}
        ></PublishForm>
      )}
      <div className={classes["editor__header"]}>
        <div></div>
        <h1 className={classes["gradient__text"]}>
          Write a new Blog
          <AiOutlineEdit color="white" />
        </h1>
        <button onClick={publishClickHandler}>Publish</button>
      </div>
      <br></br>
      <EditorComponent
        onChange={getContent}
        onClick={publishClickHandler}
      ></EditorComponent>
    </>
  );
};

export default WriteBlog;
