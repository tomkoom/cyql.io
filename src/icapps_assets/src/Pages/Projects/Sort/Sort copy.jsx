import React, { useState } from "react";
import { iAngleDown } from "../../../Icons/Icons";
import css from "./Sort.module.css";

const Sort = () => {
  const [sort, setSort] = useState("date");
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className={css.sort}>
      {!sortOpen ? (
        <button className={css.sortBtn} onClick={() => setSortOpen(true)}>
          <p>Order by: </p>
          <p className={css.sortBtnOpt}>
            {sort === "date" && "Date"}
            {sort === "upvotes" && "Upvotes"}
          </p>
          <span className={css.icon}>{iAngleDown}</span>
        </button>
      ) : (
        <ul className={css.sortSelect} onClick={() => setSortOpen(false)}>
          <li
            onClick={() => {
              setSort("date");
              setSortOpen(false);
            }}
          >
            Date
          </li>
          <li
            onClick={() => {
              setSort("upvotes");
              setSortOpen(false);
            }}
          >
            Upvotes
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sort;
