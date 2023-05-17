import React from "react";
import classes from "./Navbar.module.css";
import TextField from "@mui/material/TextField";

import CustomizedInputBase from "../SearchFeild/SearchField.js";

const Navbar = () => {
  return (
    <nav>
      <div className={classes["nav__brand"]}>
        Meta<span>Blog</span>
      </div>

      <div className={classes["nav__links-container"]}>
        <ul className={classes["nav__links"]}>
          <li className={classes["nav__links-link"]}>Home</li>
          <li className={classes["nav__links-link"]}>Blog</li>
          <li className={classes["nav__links-link"]}>Single Post</li>
          <li className={classes["nav__links-link"]}>Pages</li>
          <li className={classes["nav__links-link"]}>Contact</li>
        </ul>
      </div>

      <div>
        <input placeholder="Search" />
      </div>
    </nav>
  );
};

export default Navbar;
