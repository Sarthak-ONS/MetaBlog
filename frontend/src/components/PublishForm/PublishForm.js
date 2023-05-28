import React from "react";
import classes from "./PublishForm.module.css";
import Modal from "../Modals/Modal";

import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Loader from "../Loaders/Loader";

const PublishForm = (props) => {
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
        <Form className={classes["publish-box"]} method="POST">
          <div className={classes["user-box"]}>
            <label htmlFor="title">Title</label>
            <input required name="title" type="text" />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="subtitle">Subtitle</label>
            <input required name="subtitle" type="text" />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="image">Image</label>
            <input required name="image" type="file" />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="categories">Categories</label>
            <input
              placeholder="Separated by Commas"
              required
              name="categories"
              type="text"
            />
          </div>
          <div className={classes["user-box"]}>
            <label htmlFor="tags">Image</label>
            <input
              placeholder="Separated by Commas"
              required
              name="tags"
              type="text"
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
