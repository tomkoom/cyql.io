import React from "react";
import css from "./Title.module.css";

const Title = () => {
  return (
    <div className={css.title}>
      <h6>
        categories <span className={css.span}>one or multiple</span>
      </h6>
    </div>
  );
};

export default Title;
