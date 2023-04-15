import React from "react";
import css from "./Main.module.css";

// components
import { Logo, Title } from "./index";

const Main = ({ logo, name, description, grantee }) => {
  return (
    <div className={css.main}>
      <Logo logo={logo} name={name} />
      <Title name={name} description={description} grantee={grantee} />
    </div>
  );
};

export default Main;
