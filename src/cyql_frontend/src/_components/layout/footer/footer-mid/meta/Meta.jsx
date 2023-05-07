import React from "react";
import css from "./Meta.module.css";

// components
import { Badge, Copy } from "./index";

const Meta = () => {
  return (
    <div className={css.meta}>
      <Badge />
      <Copy />
    </div>
  );
};

export default Meta;
