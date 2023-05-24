import React, { useState, useEffect } from "react";
import classes from "./Navbar.module.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

import CustomButton from "../Button/CustomButton";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setIsVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  const [toggleMenu, setToggleMenu] = useState(false);

  const menuIconColor = "#fff";

  const menuOpenClickHandler = () => {
    setToggleMenu(true);
  };
  const menuCloseClickHandler = () => {
    setToggleMenu(false);
  };

  const loginClickHandler = (name) => {
    console.log("Redirecting to login Paage");

    return navigate(`/auth/${name}`);
  };

  const animateNavClass = `${
    !isVisible ? classes["fade-animation"] : classes["fade-animation.show"]
  }`;

  return (
    <div className={animateNavClass}>
      {isVisible && (
        <>
          <nav>
            <div className={`${classes["nav__brand"]} `}>
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
                    Featured
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
                    to="/creators"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                  >
                    Write
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={classes["nav__button"]}>
              <CustomButton
                text={"Login"}
                onClick={loginClickHandler.bind(null, "login")}
              />
              <CustomButton
                color={"var(--color-text)"}
                text={"Sign up"}
                onClick={loginClickHandler.bind(null, "signup")}
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
                <NavLink
                  onClick={menuCloseClickHandler}
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Home
                </NavLink>
              </p>
              <p className={classes["navbar-menu_container-link"]}>
                <NavLink
                  onClick={menuCloseClickHandler}
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Blog
                </NavLink>
              </p>
              <p className={classes["navbar-menu_container-link"]}>
                <NavLink
                  onClick={menuCloseClickHandler}
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Our Story
                </NavLink>
              </p>
              <p className={classes["navbar-menu_container-link"]}>
                <NavLink
                  onClick={menuCloseClickHandler}
                  to="/creators"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Write
                </NavLink>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
