import React from "react";
import css from "./Meta.module.css";

// components
import { Edit, Published } from "./index";

const Meta = ({ added }) => {
  return (
    <div className={css.meta}>
      <Published added={added} />
      <Edit />
    </div>
  );
};

export default Meta;
