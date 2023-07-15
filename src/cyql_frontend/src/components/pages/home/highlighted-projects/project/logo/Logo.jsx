import React from "react";
import css from "./Logo.module.css";

// components
import { LogoLetter } from "@/components/ui-elements/_index";

const Logo = ({ name, logo }) => {
  const sizeRem = "4.5";
  const borderRadiusRem = "1";
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
