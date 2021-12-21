import React from "react";
import css from "./Heading.module.css";

const Heading = () => {
  return (
    <div className={css.heading}>
      <h2 className={css.heading__title}>Discover new projects</h2>
    </div>
  );
};

export default Heading;
