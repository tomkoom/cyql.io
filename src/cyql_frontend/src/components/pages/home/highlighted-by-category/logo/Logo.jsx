import React from "react";
import css from "./Logo.module.css";

const Logo = ({ logo, name }) => {
  return <img className={css.logo} src={logo} alt={`${name} logo`} />;
};

export default Logo;
