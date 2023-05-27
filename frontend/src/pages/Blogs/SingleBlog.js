import React, { useEffect, useState } from "react";
import classes from "./SingleBlog.module.css";
import { useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";

import Snackbar from "@mui/material/Snackbar";
import useHttp from "../../hooks/use-http";

import MuiAlert from "@mui/material/Alert";

import {
  BsFillBookmarkFill,
  BsBookmark,
  BsFillShareFill,
} from "react-icons/bs";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SingleBlog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [isBookMarked, setIsBookMarked] = useState(false);

  const data = useLoaderData();

  const styles = {
    backgroundImage: `url(${data.blog.image.secure_url})`,
  };

  const blogDate = new Date(data.blog.createdAt).toLocaleDateString();

  const bookMarkHandler = async () => {
    console.log("Started bookmarking");
    const response = await fetch(
      `http://localhost:4000/blog/${data.blog._id}/bookmark`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const d = await response.json();
    console.log(d);

    if (d.message === "ADDED TO BOOKMARKS") {
      setIsBookMarked(true);
    } else {
      handleClick();
      setIsBookMarked(false);
    }
  };

  const { isLoading, error, sendRequest: fetchStatus } = useHttp();

  const token = getAuthToken();

  useEffect(() => {
    const transformData = (data) => {
      if (data.message == "BOOKMARKED") {
        setIsBookMarked(true);
      }
    };

    fetchStatus(
      {
        url: `http://localhost:4000/blog/${data.blog._id}/bookmark/check`,
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      transformData
    );
  }, [fetchStatus]);

  return (
    <>
      <div className={classes["SingleBlog__header"]}>
        <div style={styles} className={classes["SingleBlog__coverimage"]} />
        <div className={classes["SingleBlog__header-author__image"]}>
          <img alt="Author Image" src={data.blog.author.image.secure_url} />
        </div>

        <div className={classes["SingleBlog__actions"]}>
          <div></div>
          <h1>{data.blog.title}</h1>
          <div className={classes["SingleBlog__actions-buttons"]}>
            {isBookMarked && <BsBookmark onClick={bookMarkHandler} size={15} />}
            {!isBookMarked && (
              <BsFillBookmarkFill size={15} onClick={bookMarkHandler} />
            )}
            <BsFillShareFill size={15} />
          </div>
        </div>
        <p className={classes["SingleBlog__header-authorname"]}>
          By - <span>{data.blog.author.name}</span>
        </p>
        <p className={classes["SingleBlog__header-date"]}>{blogDate}</p>
        <p className={classes["SingleBlog__header-content"]}>
          {data.blog.content}
        </p>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        style={{ backgroundColor: "transparent" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          style={{ backgroundColor: "transparent", boxShadow: "2px 5px 5px white" }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Bookmarked!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SingleBlog;

function checkIsBookMarked() {}

export async function SingleBlogLoader({ request, params }) {
  const id = params.blogId;

  const response = await fetch("http://localhost:4000/blog/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw { isError: true, message: "Unable to get Blog", status: 404 };
  }

  return response;
}
