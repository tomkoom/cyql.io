import React from "react";
import css from "./Logo.module.css";
import logo from "../../../assets/logo/cyql-logo.svg";

// routes
import { toHome } from "../../Routes/routes";

const Logo = () => {
  return (
    <div className={css.logo}>
      <img src={logo} alt="cyql-logo" />
      <h1>cyql</h1>
    </div>
  );
};

export default Logo;
