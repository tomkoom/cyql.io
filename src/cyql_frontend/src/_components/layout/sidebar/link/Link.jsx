import React from "react";
import css from "./Link.module.css";

const Link = ({ label, url, logo }) => {
  return (
    <a className={css.link} href={url} target="_blank" rel="noreferrer noopener">
      <img className={css.logo} src={logo} />
      <span className={css.label}>{label}</span>
    </a>
  );
};

export default Link;
