import React, { useState } from "react";
import classes from "./PublishForm.module.css";
import Modal from "../Modals/Modal";

import { Form, useActionData, useNavigation } from "react-router-dom";
import Loader from "../Loaders/Loader";

const PublishForm = (props) => {
  const [image, setImage] = useState();

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

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
        <Form className={classes["publish-box"]} method="POST" typeof="">
          <div className={classes["user-box"]}>
            <label htmlFor="title">Title</label>
            <input
              required
              name="title"
              defaultValue={"This is a title"}
              type="text"
            />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="subtitle">Subtitle</label>
            <input
              required
              name="subtitle"
              type="text"
              defaultValue={"This is a subtitle"}
            />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="image">Image</label>
            <input onChange={handleImageChange} name="image" type="file" />
            <img src={image}></img>
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="categories">Categories</label>
            <input
              placeholder="Separated by Commas"
              // required
              name="categories"
              type="text"
              defaultValue={"technology"}
            />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="tags">Tags</label>
            <input
              placeholder="Separated by Commas"
              // required
              name="tags"
              type="text"
              defaultValue={"react, javascript"}
            />
          </div>
          {isSubmitting && <Loader />}
          {!isSubmitting && (
            <button disabled={isSubmitting} type="submit">
              Publish
            </button>
          )}
        </Form>
      </div>
    </Modal>
  );
};

export default PublishForm;
