import React from "react";
import classes from "./CreatorPage.module.css";

import Lottie from "lottie-react";
import BrainAnimation from "../../assets/brain.json";
import FaqCard from "../../components/FaqCard/FaqCard";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    id: 1,
    q: "How do I start writing on Meta?",
    a: "First, make a free account. Then, to create a story, click on your profile picture in the top-right corner of the page, then “Write a Story.”",
  },
  {
    id: 2,
    q: "Who writes on Meta?",
    a: "Anyone can write on Medium. Whether you’ve never written before or are ready to create a full publication, it’s easy to get started and we allow you to focus more on big ideas and less on driving clicks. With the option to earn for your work, you can also be directly rewarded for the value you provide readers.",
  },
  {
    id: 3,
    q: "Who can read the work I publish on Medium?",
    a: "Anyone on the internet can read your stories. Even if your story is being distributed in the Partner Program as a part of our metered paywall, anyone can still read a limited number of articles for free each month.",
  },
  {
    id: 4,
    q: "Do I need to pay for writing a blog?",
    a: "No, absolutely not, our platform is completely free.",
  },
];

const CreatorPage = () => {
  const navigate = useNavigate();

  const writingButtonClickHandler = () => {
    navigate("/blog/new");
  };
  return (
    <>
      <div className={classes["creators"]}>
        <div className={classes["creators__header"]}>
          <div className={classes["creators__header-content"]}>
            <h5>START A BLOG FOR FREE</h5>
            <h2>Publish, grow, and earn, all in one place.</h2>
            <p>
              If you have a story to tell, knowledge to share, or a perspective
              to offer
              <br /> — welcome home. Sign up for free so your writing can thrive
              in a network<br></br> supported by millions of readers.
            </p>
            <span>
              <button
                className={classes["button"]}
                onClick={writingButtonClickHandler}
              >
                Start Writing
              </button>
            </span>
          </div>
          <div
            id={classes["a"]}
            className={classes["creators__header-animation"]}
          >
            <Lottie
              style={{ backgroundColor: "transparent" }}
              animationData={BrainAnimation}
              loop={true}
            ></Lottie>
          </div>
        </div>
      </div>
      <FAQList />
    </>
  );
};

const FAQList = () => {
  return (
    <div className={classes["creator__content-faqs"]}>
      <h1>More about writing on MetaBlogs</h1>
      <div className={classes["creator__content-faq"]}>
        {faqs.map(({ id, q, a }) => (
          <FaqCard
            q={q}
            a={a}
            key={id}
            index={id}
            onClick={() => {
              console.log("Tapping");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatorPage;
