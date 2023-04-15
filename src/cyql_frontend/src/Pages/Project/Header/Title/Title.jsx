import React from "react";
import css from "./Title.module.css";

// components
import { Name, Tags } from "./index";

const Title = ({ name, category, github, canister, grantee }) => {
  return (
    <div className={css.title}>
      <Name name={name} />
      <Tags category={category} github={github} canister={canister} grantee={grantee} />
    </div>
  );
};

export default Title;
