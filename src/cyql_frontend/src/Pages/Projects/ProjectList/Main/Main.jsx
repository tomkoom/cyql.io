import React from "react";
import css from "./Main.module.css";

// components
import { Logo, Title } from "./index";

const Main = ({ logo, name, description }) => {
  return (
    <div className={css.main}>
      <Logo logo={logo} name={name} />
      <Title name={name} description={description} />
    </div>
  );
};

export default Main;
