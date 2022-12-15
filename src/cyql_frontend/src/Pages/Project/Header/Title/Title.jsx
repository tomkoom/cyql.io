import React from "react";
import css from "./Title.module.css";

// components
import { Name, Tags } from "./index";

const Title = ({ name, grantee, category, tags }) => {
  return (
    <div className={css.title}>
      <Name name={name} grantee={grantee} />
      <Tags category={category} tags={tags} />
    </div>
  );
};

export default Title;
