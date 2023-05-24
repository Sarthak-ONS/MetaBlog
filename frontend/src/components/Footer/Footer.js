import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles["footer__brand"]} `}>
        Meta<span>Blog</span>
      </div>
      "Everyone should write"
      <div className={styles["footer__links"]}>
        <li>About</li>
        <li>Terms</li>
        <li>Privacy</li>
        <li>Help</li>
      </div>
    </footer>
  );
};

export default Footer;
