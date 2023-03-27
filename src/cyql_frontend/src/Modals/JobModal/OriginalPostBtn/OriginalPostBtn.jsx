import React from "react";
import css from "./OriginalPostBtn.module.css";

// icons
import { iExternalLink } from "../../../Icons/Icons";

const OriginalPostBtn = ({ sourceUrl }) => {
  return (
    <a className={css.link} href={sourceUrl} target="_blank" rel="noreferrer noopener">
      <p>Original post</p>
      <span className={css.icon}>{iExternalLink}</span>
    </a>
  );
};

export default OriginalPostBtn;
