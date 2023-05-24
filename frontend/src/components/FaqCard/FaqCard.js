import React, { useState } from "react";
import styles from "./FaqCard.module.css";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FaqCard = ({ index, q, a, onClick }) => {
  const [showAns, setShowAns] = useState(false);

  const clickHandler = () => {
    setShowAns((showAns) => {
      setShowAns(!showAns);
    });

    onClick();
  };

  return (
    <div onClick={clickHandler} key={index} className={styles["faq__card"]}>
      <div className={styles["faq__card-question"]}>
        {q}
        {!showAns && <IoIosArrowDown />}
        {showAns && <IoIosArrowUp />}
      </div>
      {showAns && <div className={styles["faq__ans"]}>{a}</div>}
    </div>
  );
};

export default FaqCard;
