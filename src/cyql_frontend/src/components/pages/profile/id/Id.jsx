import React from "react";
import css from "./Id.module.css";

// components
import { IdImg } from "@ui-elements/index";
import { Ids, Title } from "./index";

const Id = () => {
  return (
    <div className={css.id}>
      <IdImg size={128} />
      <div className={css.main}>
        <Title />
        <Ids />
      </div>
    </div>
  );
};

export default Id;
