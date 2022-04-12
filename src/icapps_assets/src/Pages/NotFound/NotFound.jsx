import React from "react";
import css from "./NotFound.module.css";
import { toHome } from "../../Routes/routes";

const NotFound = () => {
  return (
    <div className={css.notFound}>
      <p>
        Requested page was not found <span onClick={toHome}>go home</span>
      </p>
    </div>
  );
};

export default NotFound;
