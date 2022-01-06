import React from "react";
import css from "./LogoComponents.module.css";
import Logo from "./logo.svg";

const LogoComponent = () => {
  return (
    <div className={css.logoComponent}>
      <img src={Logo} width="34" height="34" alt="icApps.xyz Logo" />
      <h2>icApps</h2>
    </div>
  );
};

export default LogoComponent;
