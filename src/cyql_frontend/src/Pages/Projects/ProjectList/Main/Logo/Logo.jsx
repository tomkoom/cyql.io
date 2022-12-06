import React from "react";
import css from "./Logo.module.css";

const Logo = ({ logo, name }) => {
  return (
    <div className={css.logo}>
      <img src={logo} alt={`${name} logo`} />
    </div>
  );
};

export default Logo;
