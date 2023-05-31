import React from "react";
import classes from "./EditBlog.module.css";

import {
  Form,
  useNavigation,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import Loader from "../../components/Loaders/Loader";
import { getAuthToken } from "../../utils/auth";
import EditorComponent from "../../components/Editor/EditorComponent";

const EditBlog = () => {
  const data = useActionData();

  const loaderdata = useLoaderData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const handleContentdata = (updatedContentData) => {
    console.log(updatedContentData);
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
  };

  const imageClickHandler = () => {
    console.log("CLICKED IMAGE");
    document.getElementById("image-input").click();
  };

  return (
    <div className={classes["EditPage"]}>
      <div className={classes["update-box"]}>
        <h1>Edit Blog</h1>
        {data && data.errors && data.errors && (
          <p className={classes["error__msg"]}>{data.errors.msg}</p>
        )}
        {data && data.status === "ERROR" && (
          <p className={classes["error__msg"]}>{data.errorMessage}</p>
        )}
        <Form className={classes.form} method="PUT">
          <div className={classes["c1"]}>
            <div className={classes["c1-c1"]}>
              <div className={classes["user-box"]}>
                <label htmlFor="title">Title</label>
                <input
                  defaultValue={loaderdata.blog.title}
                  required
                  name="title"
                  type="text"
                />
              </div>
              <div className={classes["user-box"]}>
                <label htmlFor="subtitle">Subtitle</label>
                <input
                  defaultValue={loaderdata.blog.subtitle}
                  required
                  name="subtitle"
                  type="text"
                />
              </div>
              <div style={{ display: "none" }} className={classes["user-box"]}>
                <label htmlFor="subtitle">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image-input"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
              <div className={classes["user-box"]}>
                <label htmlFor="tags">Tags</label>
                <input
                  defaultValue={loaderdata.blog.tags}
                  required
                  name="tags"
                  type="text"
                />
              </div>
              <div className={classes["user-box"]}>
                <label htmlFor="category">Category</label>
                <input
                  defaultValue={loaderdata.blog.category}
                  required
                  name="category"
                  type="text"
                />
              </div>
            </div>

            <div className={classes["c1-c2"]}>
              <p>Tap to edit image</p>
              <img
                onClick={imageClickHandler}
                src={loaderdata.blog.image.secure_url}
              ></img>
            </div>
          </div>
          <EditorComponent
            defaultContent={loaderdata.blog.content}
            onChange={handleContentdata}
          />
          <div>
            {isSubmitting && <Loader />}
            {!isSubmitting && (
              <button disabled={isSubmitting} type="submit">
                Submit
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export async function loader({ params }) {
  const token = getAuthToken();
  const response = await fetch("http://localhost:4000/blog/" + params.blogId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    console.log("RESPONSE NOT OKAY");
    const data = { message: "Could not fetch Blog." };
    throw { isError: true, message: data.message, status: 500 };
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const data = await request.formData();
  const token = getAuthToken();

  const par = params;

  console.log(par);
  // console.log(data);

  // const blogId = "";

  const blogData = {
    title: data.get("title"),
    subtitle: data.get("subtitle"),
    image: data.get("image"),
    tags: data.get("tags"),
    category: data.get("category"),
  };

  console.log(blogData);

  // const response = await fetch("http://localhost:4000/blog/edit/" + blogId, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + token,
  //   },
  //   body: JSON.stringify(blogData),
  // });

  // if (
  //   response.status === 422 ||
  //   response.status === 401 ||
  //   response.status === 404
  // ) {
  //   return response;
  // }

  // if (!response.ok) {
  //   const data = { message: "Could not Update Blog. Please try again later!" };
  //   throw { isError: true, message: data.message, status: response.status };
  // }

  return {};
}

export default EditBlog;
