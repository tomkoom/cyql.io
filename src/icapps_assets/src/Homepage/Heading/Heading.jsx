import React from "react";
import css from "./Heading.module.css";

const Heading = () => {
  return (
    <div className={css.appList__heading}>
      <h2 className={css.appList__heading__title}>Discover new projects</h2>
    </div>
  );
};

export default Heading;
