import React from "react";
import css from "./Btn.module.css";

// icons
import { iExternalLink } from "@icons/Icons";

const Btn = ({ label, url }) => {
  return (
    <a className={css.btn} href={url} target="_blank" rel="norefferrer noopener">
      {label}
      <span className={css.icon}>{iExternalLink}</span>
    </a>
  );
};

export default Btn;
