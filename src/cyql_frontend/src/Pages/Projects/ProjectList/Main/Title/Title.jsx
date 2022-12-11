import React from "react";
import css from "./Title.module.css";

const Title = ({ name, description }) => {
  const format = (d) => {
    return d && d.length > 70 ? `${d.substring(0, 70)}…` : d;
  };

  return (
    <div className={css.title}>
      <h3 className={css.name}>{name}</h3>
      <p className={css.description}>{format(description)}</p>
    </div>
  );
};

export default Title;
