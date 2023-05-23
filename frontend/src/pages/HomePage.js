import React from "react";
import Header from "../containers/Header/Header";
import Trending from "../containers/Trending/Trending";
import Category from "../containers/Category/Category";

const HomePage = () => {
  return (
    <>
      <Header />
      <Trending />
      <Category />
    </>
  );
};

export default HomePage;
