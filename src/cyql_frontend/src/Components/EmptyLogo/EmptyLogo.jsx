import React from "react";
import css from "./EmptyLogo.module.css";

const EmptyLogo = ({ sizeRem, borderRadiusRem, name }) => {
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

export default EmptyLogo;
