import React from "react";
import classes from "./BlogPageHeader.module.css";

const BlogPageHeader = () => {
  return (
    <div className={classes["main-header"]}>
      <h5 className={classes["main-header__featured"]}>featured</h5>
      <h3 className={classes["main-header__title"]}>
        Breaking Into Product Design: <br />
        Advice from Untitled Founder, Frankie
      </h3>
      <p className={classes["main-header__content"]}>
        Letts get one thing out of the way: you dont need a fancy Bachelor's
        Degree to get into Product DeEtgmWe sat down with FrankiöSüllivan to
        talk.@boutgatekeepi product design'nd how anyone can get intotfiis
        growing indu
      </p>
      <br></br>
    </div>
  );
};

export default BlogPageHeader;
