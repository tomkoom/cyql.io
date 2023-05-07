import React from "react";
import css from "./Main.module.css";

// components
import { Logo, Title } from "./index";

const Main = ({ logo, name, description, github, canister, grantee }) => {
  return (
    <div className={css.main}>
      <Logo logo={logo} name={name} />
      <Title
        name={name}
        description={description}
        github={github}
        canister={canister}
        grantee={grantee}
      />
    </div>
  );
};

export default Main;
