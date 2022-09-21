import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown, iSort } from "../../../../Icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectSort } from "../../../../State/sort";

const Btn = () => {
  const sort = useSelector(selectSort);

  return (
    <div className={css.btn}>
      <p className={css.text}>
        <span className={css.icon}>{iSort}</span> Order by:{" "}
        <span className={css.category}>
          {sort === "date" ? "Date added" : sort === "upvotes" ? "Popularity" : null}
        </span>{" "}
        <span className={css.icon}>{iAngleDown}</span>
      </p>
    </div>
  );
};

export default Btn;
