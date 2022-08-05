import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown } from "../../../../Icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectFilterByOpenSource } from "../../../../State/filter";

const Btn = () => {
  const filter = useSelector(selectFilterByOpenSource);

  return (
    <div className={css.btn}>
      <p className={css.text}>
        Open Source:{" "}
        <span className={css.category}>
          {filter === "all"
            ? "All"
            : filter === "true"
            ? "True"
            : filter === "false"
            ? "False"
            : null}
        </span>{" "}
        <span className={css.icon}>{iAngleDown}</span>
      </p>
    </div>
  );
};

export default Btn;
