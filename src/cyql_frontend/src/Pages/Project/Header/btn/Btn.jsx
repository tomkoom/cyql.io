import React from "react";
import css from "./Btn.module.css";

const Btn = ({ icon, onClick }) => {
  return (
    <button className={css.btn} onClick={onClick}>
      <span className={css.icon}>{icon}</span>
    </button>
  );
};

export default Btn;
