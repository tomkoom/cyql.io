import React from "react";
import css from "./FooterBot.module.css";
import ICLogo from "../../../../assets/ic-logo.svg";

const FooterBot = () => {
  return (
    <div className={css.footerBot}>
      <p>Powered by</p>
      <a href="https://dfinity.org/" target="_blank" rel="noreferrer noopener">
        <img className={css.icLogo} src={ICLogo} alt="Internet-Computer-logo" />
        Internet Computer
      </a>
    </div>
  );
};

export default FooterBot;
