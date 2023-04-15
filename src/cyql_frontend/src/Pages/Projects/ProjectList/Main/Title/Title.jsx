import React from "react";
import css from "./Title.module.css";

// icons
import { iMeteor } from "@icons/Icons";

const Title = ({ name, description, grantee }) => {
  const format = (d) => {
    return d && d.length > 70 ? `${d.substring(0, 70)}…` : d;
  };

  return (
    <div className={css.title}>
      <div className={css.main}>
        <h3 className={css.name}>{name}</h3>
        {grantee && <span className={css.grantee}>{iMeteor}</span>}
      </div>
      <p className={css.description}>{format(description)}</p>
    </div>
  );
};

export default Title;
