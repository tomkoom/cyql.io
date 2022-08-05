import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown } from "../../../../Icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectCategory } from "../../../../State/category";

const Btn = () => {
  const category = useSelector(selectCategory);

  return (
    <div className={css.btn}>
      <p className={css.text}>
        Category: <span className={css.category}>{category}</span>{" "}
        <span className={css.icon}>{iAngleDown}</span>
      </p>
    </div>
  );
};

export default Btn;
