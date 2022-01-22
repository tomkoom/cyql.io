import React from "react";
import css from "./Logo.module.css";
import logo from "./logo.svg";

const Logo = () => {
  return (
    <div className={css.logoComponent}>
      <img src={logo} alt="icApps.xyz logo" />
      <h2>icApps</h2>
    </div>
  );
};

export default Logo;
