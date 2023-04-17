import React from "react";
import css from "./Btn.module.css";

const Btn = ({ grantee, value, label, setGrantee }) => {
  return (
    <button
      className={grantee === value ? `${css.btn} ${css.active}` : css.btn}
      onClick={() => setGrantee(null)}
    >
      {label}
    </button>
  );
};

export default Btn;
