import React from "react";
import css from "./Btn.module.css";

const Btn = ({ text, type, onClick }) => {
  return (
    <button className={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Btn;
