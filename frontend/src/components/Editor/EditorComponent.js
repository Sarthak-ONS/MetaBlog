import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classes from "./EditorComponent.module.css";

const EditorComponent = (props) => {
  const [value, setValue] = useState("");

  const handleContentChange = ({}) => {
    setValue(value);
    console.log(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const styles = {
    height: "100%",
    width: "100%",
    color: "white",
  };

  return (
    <ReactQuill
      className={classes.quill}
      theme="snow"
      value={value}
      onChange={handleContentChange}
      modules={modules}
      placeholder="Start writing your blog."
      formats={formats}
      styles={styles}
    ></ReactQuill>
  );
};

export default EditorComponent;
