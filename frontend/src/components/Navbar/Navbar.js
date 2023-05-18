import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

import CustomButton from "../Button/CustomButton";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const menuIconColor = "#040c18";

  const menuOpenClickHandler = () => {
    setToggleMenu(true);
  };
  const menuCloseClickHandler = () => {
    setToggleMenu(false);
  };

  return (
    <>
      <nav>
        <div className={classes["nav__brand"]}>
          Meta<span>Blog</span>
        </div>

        <div className={classes["nav__links-container"]}>
          <ul className={classes["nav__links"]}>
            <li className={classes["nav__links-link"]}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li className={classes["nav__links-link"]}>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Blog
              </NavLink>
            </li>
            <li className={classes["nav__links-link"]}>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Our Story
              </NavLink>
            </li>
            <li className={classes["nav__links-link"]}>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes["nav__button"]}>
          <CustomButton text={"Login"} onClick={() => {}} />
          <CustomButton
            color={"var(--color-text)"}
            text={"Sign up"}
            onClick={() => {}}
          />
        </div>
      </nav>

      <div className={classes["nav__mobile"]}>
        <div className={classes["nav__brand"]}>
          Meta<span>Blog</span>
        </div>
        <div className={classes["menu-icon__wrapper"]}>
          {!toggleMenu && (
            <RiMenu3Line
              onClick={menuOpenClickHandler}
              color={menuIconColor}
              size={30}
            />
          )}
          {toggleMenu && (
            <RiCloseLine
              onClick={menuCloseClickHandler}
              color={menuIconColor}
              size={30}
            />
          )}
        </div>
      </div>
      {toggleMenu && (
        <div className={classes["navbar-menu_container-links"]}>
          <p className={classes["navbar-menu_container-link"]}>
            <a href="#home">Home</a>
          </p>
          <p className={classes["navbar-menu_container-link"]}>
            <a href="#wgpt3">Blogs</a>
          </p>
          <p className={classes["navbar-menu_container-link"]}>
            <a href="#possibility">Pages</a>
          </p>
          <p className={classes["navbar-menu_container-link"]}>
            <a href="#features">Contact</a>
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;
