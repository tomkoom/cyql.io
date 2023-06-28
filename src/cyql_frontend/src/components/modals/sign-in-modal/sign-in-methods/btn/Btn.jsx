import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleRight } from "@/components/icons/Icons";

const Btn = ({ label, logo, onClick }) => {
  return (
    <button className={css.btn} onClick={onClick}>
      <div className={css.main}>
        <img className={css.logo} src={logo} alt={`${label} logo"`} />
        <span className={css.label}>{label}</span>
      </div>
      <span className={css.icon}>{iAngleRight}</span>
    </button>
  );
};

export default Btn;
