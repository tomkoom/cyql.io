import React from "react";
import css from "./FooterBot.module.css";
import ICLogo from "../../../../assets/ic-logo.svg";

const FooterBot = () => {
  return (
    <div className={css.footerBot}>
      <div className={css.icBadge}>
        <p className={css.icBadgeText}>Powered by</p>
        <a href="https://dfinity.org/" target="_blank" rel="noreferrer noopener">
          <img className={css.icLogo} src={ICLogo} alt="Internet Computer logo" />
          Internet Computer
        </a>
      </div>
      <div>
        <p className={css.copy}>©2022 cyql</p>
      </div>
    </div>
  );
};

export default FooterBot;
