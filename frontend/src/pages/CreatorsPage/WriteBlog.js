import React, { useState } from "react";
import classes from "./WriteBlogPage.module.css";
import PublishForm from "../../components/PublishForm/PublishForm";

import EditorComponent from "../../components/Editor/EditorComponent";
import { AiOutlineEdit } from "react-icons/ai";
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

  return (
    <>
      {showPublishForm && (
        <PublishForm onClose={closePublishFormHandler}></PublishForm>
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
      <EditorComponent onClick={publishClickHandler}></EditorComponent>
    </>
  );
};

export async function action({ request }) {
  const data = await request.formData();

  const publishData = {
    title: data.get("title"),
    subtitle: data.get("subtitle"),
    image: data.get("image"),
    categories: data.get("categories"),
    tags: data.get("tags"),
  };

  console.log(publishData);

  // const response = await fetch("http://localhost:4000/blog/new", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(authData),
  // });

  // if (
  //   response.status === 422 ||
  //   response.status === 401 ||
  //   response.status == 404
  // ) {
  //   return response;
  // }

  // if (!response.ok) {
  //   const data = { message: "Could not authenticate user." };
  //   throw { isError: true, message: data.message, status: response.status };
  // }

  // return redirect("/");
}

export default WriteBlog;
