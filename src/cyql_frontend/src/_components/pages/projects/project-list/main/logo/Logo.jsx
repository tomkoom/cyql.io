import React from "react";
import css from "./Logo.module.css";

// components
import { LogoLetter } from "@ui-elements/index";

const Logo = ({ name, logo }) => {
  const sizeRem = "5";
  const borderRadiusRem = "1.25";
  const style = {
    width: `${sizeRem}rem`,
    height: `${sizeRem}rem`,
    borderRadius: `${borderRadiusRem}rem`,
  };

  return logo ? (
    <img style={style} className={css.logo} src={logo} alt={`${name} logo`} />
  ) : (
    <LogoLetter sizeRem={sizeRem} borderRadiusRem={borderRadiusRem} name={name} />
  );
};

export default Logo;
