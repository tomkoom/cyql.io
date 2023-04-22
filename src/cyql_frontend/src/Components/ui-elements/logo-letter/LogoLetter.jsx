import React from "react";
import css from "./LogoLetter.module.css";

const LogoLetter = ({ sizeRem, borderRadiusRem, name }) => {
  const firstLetter = name.charAt(0);
  const style = {
    width: `${sizeRem}rem`,
    height: `${sizeRem}rem`,
    borderRadius: `${borderRadiusRem}rem`,
  };

  return (
    <div style={style} className={css.empty}>
      {firstLetter}
    </div>
  );
};

export default LogoLetter;
