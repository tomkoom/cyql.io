import React from "react";
import css from "./Name.module.css";

const Name = ({ name }) => {
  return <h3 className={css.name}>{name}</h3>;
};

export default Name;
