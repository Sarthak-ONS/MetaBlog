import React, { useState, useRef } from "react";
import classes from "./PublishForm.module.css";
import Modal from "../Modals/Modal";

import { Form, Navigate, useActionData, useNavigate } from "react-router-dom";
import Loader from "../Loaders/Loader";
import { getAuthToken } from "../../utils/auth";

const PublishForm = (props) => {
  const navigate = useNavigate();

  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();

  const titleRef = useRef();
  const subtitleRef = useRef();
  const imageRef = useRef();
  const categoriesRef = useRef();
  const tagsRef = useRef();

  const publishClickHandler = async () => {
    setisSubmitting(true);
    const formData = new FormData();

    formData.append("title", titleRef.current.value);
    formData.append("subtitle", subtitleRef.current.value);
    formData.append("content", props.content);
    formData.append("image", imageFile);
    formData.append("category", categoriesRef.current.value);
    formData.append("tags", tagsRef.current.value);

    const token = getAuthToken();
    const response = await await fetch("http://localhost:4000/blog/new", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        // "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (response.ok) {
      setisSubmitting(false);
      props.onClose();
      return navigate("/");
    }
    setisSubmitting(false);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const data = useActionData();

  const [isSubmitting, setisSubmitting] = useState(false);

  const closeHandler = () => {
    console.log("CLOSING MODAL");
    props.onClose();
  };

  return (
    <Modal onClose={closeHandler}>
      <div className={classes["PublishForm"]}>
        <h2>Publish Your Blog</h2>
        {data && data.errors && data.errors && (
          <p className={classes["error__msg"]}>{data.errors.msg}</p>
        )}
        {data && data.status === "ERROR" && (
          <p className={classes["error__msg"]}>{data.errorMessage}</p>
        )}
        <Form className={classes["publish-box"]} typeof="">
          <div className={classes["user-box"]}>
            <label htmlFor="title">Title</label>
            <input required name="title" type="text" ref={titleRef} />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="subtitle">Subtitle</label>
            <input required name="subtitle" type="text" ref={subtitleRef} />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="image">Image</label>
            <input
              onChange={handleImageChange}
              name="image"
              required
              type="file"
              ref={imageRef}
            />

            {image && <img src={image}></img>}
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="categories">Categories</label>
            <input
              placeholder="Separated by Commas"
              required
              name="categories"
              type="text"
              ref={categoriesRef}
            />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="tags">Tags</label>
            <input
              placeholder="Separated by Commas"
              required
              name="tags"
              type="text"
              ref={tagsRef}
            />
          </div>
          {isSubmitting && <Loader />}
          {!isSubmitting && (
            <button onClick={publishClickHandler} type="button">
              Publish
            </button>
          )}
        </Form>
      </div>
    </Modal>
  );
};

export default PublishForm;
