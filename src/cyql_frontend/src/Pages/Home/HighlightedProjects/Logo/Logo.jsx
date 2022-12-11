import React from "react";
import css from "./Logo.module.css";

const Logo = ({ name, logo }) => {
  return logo ? (
    <img className={css.logo} src={logo} alt={`${name} logo`} />
  ) : (
    <div className={css.empty} />
  );
};

export default Logo;
