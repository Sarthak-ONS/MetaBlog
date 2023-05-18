import React from "react";
import classes from "./AboutPageContent.module.css";
import globe from "../../assets/globe.mp4";

const AboutPageContent = () => {
  return (
    <>
      <div className={classes["aboutPage-content__container"]}>
        <p className={classes["aboutPage-content__container-para"]}>
          The best ideas can change who we are. Medium is where those ideas take
          shape, take off, and spark powerful conversations. We’re an open
          platform where over 100 million readers come to find insightful and
          dynamic thinking. Here, expert and undiscovered voices alike dive into
          the heart of any topic and bring new ideas to the surface. Our purpose
          is to spread these ideas and deepen understanding of the world.
          <br />
          <br /> We’re creating a new model for digital publishing. One that
          supports nuance, complexity, and vital storytelling without giving in
          to the incentives of advertising. It’s an environment that’s open to
          everyone but promotes substance and authenticity. And it’s where
          deeper connections forged between readers and writers can lead to
          discovery and growth. Together with millions of collaborators, we’re
          building a trusted and vibrant ecosystem fueled by important ideas and
          the people who think about them.
        </p>
        <video
          className={classes["aboutPage-content__container-video"]}
          autoPlay
          muted
          loop
          width={450}
          height={450}
        >
          <source src={globe} type="video/mp4"></source>
          Your browser doesn't support video tag.
        </video>
      </div>
      <div className={classes["aboutPage-content__container2"]}>
        <div className={classes["aboutPage-content__container2-heading"]}>
          <p>
            A living network of
            <br /> curious minds.
          </p>
        </div>
        <div className={classes["aboutPage-content__container2-para"]}>
          <p>
            Anyone can write on Medium. Thought-leaders, journalists, experts,
            and individuals with unique perspectives share their thinking here.
            You’ll find pieces by independent writers from around the globe,
            stories we feature and leading authors, and smart takes on our own
            suite of blogs and publications.
          </p>
          <p>Read as much as you want.</p>
        </div>
      </div>
    </>
  );
};

export default AboutPageContent;
