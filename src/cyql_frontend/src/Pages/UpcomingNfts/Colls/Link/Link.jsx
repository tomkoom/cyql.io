import React from "react";
import css from "./Link.module.css";

const Link = ({ label, icon }) => {
  return (
    <div className={css.link}>
      {icon && <span>{icon}</span>}
      {label && <p>{label}</p>}
    </div>
  );
};

export default Link;
