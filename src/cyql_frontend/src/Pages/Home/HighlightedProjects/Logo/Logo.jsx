import React from "react";
import css from "./Logo.module.css";

const Logo = ({ name, logo }) => {
  return <img className={css.logo} src={logo} alt={`${name} logo`} />;
};

export default Logo;
