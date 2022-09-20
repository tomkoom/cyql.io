import React from "react";
import css from "./Logo.module.css";

const Logo = ({ logo, title }) => {
  return (
    <div className={css.logo}>
      <img src={logo} alt={`${title} logo`} />
    </div>
  );
};

export default Logo;
