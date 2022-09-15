import React from "react";
import css from "./Description.module.css";

const Description = ({ name, description }) => {
  return (
    <div className={css.description}>
      <h4 className={css.subtitle}>About {name}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Description;
