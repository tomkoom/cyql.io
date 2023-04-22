import React from "react";
import css from "./Title.module.css";

// components
import { Name, Tags } from "./index";

const Title = ({ name, categories, github, canister, grantee }) => {
  return (
    <div className={css.title}>
      <Name name={name} />
      <Tags categories={categories} github={github} canister={canister} grantee={grantee} />
    </div>
  );
};

export default Title;
