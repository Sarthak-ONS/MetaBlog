import React, { useState, useEffect } from "react";
import classes from "./Navbar.module.css";
import { RiMenu3Line, RiCloseLine, RiOutletFill } from "react-icons/ri";
import { Form, NavLink, useLoaderData, useNavigate } from "react-router-dom";

import person from "../../assets/person.jpg";

import CustomButton from "../Button/CustomButton";

const Navbar = () => {
  const token = useLoaderData("root");

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

  const [loginMenu, setLoginMenu] = useState(false);

  const loginUIHandler = () => {
    console.log("Login Menu Clicked");
    if (loginMenu) {
      setLoginMenu(false);
    } else {
      setLoginMenu(true);
    }
  };

  const closeLoginUi = () => {
    setLoginMenu(false);
  };

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
            {!token && (
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
            )}
            {token && (
              <div className={classes["LoginUI"]}>
                <img src={person} onClick={loginUIHandler} />
              </div>
            )}
          </nav>

          {loginMenu && token && (
            <>
              <LoginUIMenu onClick={closeLoginUi} />
            </>
          )}

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

          {/* This is Mobile Nav */}

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

const LoginUIMenu = ({ onClick }) => {
  const liClickHandler = () => {
    onClick();
  };

  return (
    <div className={classes["LoginUI__container"]}>
      <ul>
        <li onClick={liClickHandler}>My Account</li>
        <li onClick={liClickHandler}>Write a blog</li>
        <li>
          <Form action="/logout" method="POST">
            <button type="submit">Logout</button>
          </Form>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
