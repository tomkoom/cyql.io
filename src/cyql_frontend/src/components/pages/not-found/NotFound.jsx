import React from "react";
import css from "./NotFound.module.css";
import { toHome } from "../../../routes/routes";

const NotFound = () => {
  return (
    <div className={css.notFound}>
      <p className="bodyText">
        Requested page was not found. <span onClick={toHome}>Go to homepage 🏠</span>
      </p>
    </div>
  );
};

export default NotFound;
