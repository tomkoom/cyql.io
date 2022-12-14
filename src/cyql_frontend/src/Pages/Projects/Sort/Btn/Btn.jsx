import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown, iSort } from "@icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectSort } from "@state/projects/sort";

const Btn = () => {
  const sort = useSelector(selectSort);

  return (
    <button className={css.btn}>
      <span className={css.icon}>{iSort}</span>
      <p>Order by:</p>
      <p className={css.category}>
        {sort === "date" ? "Date" : sort === "upvotes" ? "Popularity" : null}
      </p>{" "}
      <span className={css.icon}>{iAngleDown}</span>
    </button>
  );
};

export default Btn;
