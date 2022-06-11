import React from "react";
import css from "./Footer.module.css";

// components
import { FooterTop, FooterMid, FooterBot } from "./index";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <FooterTop />
        <FooterMid />
        <FooterBot />
      </div>
    </footer>
  );
};

export default Footer;
