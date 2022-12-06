import React from "react";
import css from "./Main.module.css";

// components
import { Logo } from "./index";

const Main = ({ logo, name, description }) => {
  const format = (d) => {
    return d && d.length > 70 ? `${d.substring(0, 70)}…` : d;
  };

  return (
    <div className={css.main}>
      {logo && <Logo logo={logo} name={name} />}

      <div>
        <h3 className={css.title}>{name}</h3>
        <p className={css.description}>{format(description)}</p>
      </div>
    </div>
  );
};

export default Main;
