import React from "react";
import css from "./Logo.module.css";
import logo from "../../../assets/logo.svg";

const Logo = () => {
  return (
    <div className={css.logoComponent}>
      <img src={logo} alt="cyql-logo" />
      <h1>cyql</h1>
    </div>
  );
};

export default Logo;
