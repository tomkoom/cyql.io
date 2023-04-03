import React from "react";
import css from "./Highlights.module.css";

// icons
import { iArrowRight } from "@icons/Icons";

const Highlights = () => {
  return (
    <ul className={css.highlights}>
      <li className={css.highlightsI}>
        <a
          className={css.link}
          href="https://entrepot.app/marketplace/ic-apps"
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className={css.caption}>
            <span className={css.whale}>🐋</span>
            <p className={css.text}>cyql nfts are available on Entrepot</p>
          </div>
          <span className={css.arrow}>{iArrowRight}</span>
        </a>
      </li>
      <li className={css.highlightsI}></li>
    </ul>
  );
};

export default Highlights;
