import React from "react";
import css from "./Description.module.css";

const Description = ({ name, description }) => {
  return (
    <div className={css.description}>
      <h4 className={css.title}>about {name}</h4>
      <p className={css.text}>{description}</p>
    </div>
  );
};

export default Description;
