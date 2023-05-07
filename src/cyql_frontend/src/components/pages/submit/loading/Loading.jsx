import React from "react";
import css from "./Loading.module.css";

// components
import { Spinner } from "@ui-elements/index";

const Loading = () => {
  return (
    <div className={css.loading}>
      <Spinner />
    </div>
  );
};

export default Loading;
