import React from "react";
import css from "./Header.module.css";

// icons
import CrossIcon from "../../../Icons/CrossIcon/CrossIcon";

const Header = ({ title, category, closeModal }) => {
  return (
    <div className={css.header}>
      <div className={css.titleContainer}>
        <h3 className={css.title}>{title}</h3>
        <CrossIcon onClick={closeModal} />
      </div>
      {category && <span className={css.category}>{category}</span>}
    </div>
  );
};

export default Header;
