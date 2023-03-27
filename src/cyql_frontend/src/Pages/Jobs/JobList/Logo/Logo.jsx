import React from "react";
import css from "./Logo.module.css";

const Logo = ({ logo, companyName }) => {
  return (
    <div className={css.logo}>
      <img src={logo} alt={`${companyName} logo`} />
    </div>
  );
};

export default Logo;
