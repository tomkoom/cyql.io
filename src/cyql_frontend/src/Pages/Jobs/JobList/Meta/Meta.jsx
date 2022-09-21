import React from "react";
import css from "./Meta.module.css";

// utils
import { formatDate } from "../../../../Utils/format";
import { formatId } from "../../../../Utils/format";

const Meta = ({ submitted, publisher }) => {
  return (
    <div className={css.meta}>
      <p>Posted {formatDate(submitted)}</p>
      <p>
        By{" "}
        {publisher === "frr2p-iyhp3-ioffo-ysh2e-babmd-f6gyf-slb4h-whtia-5kg2n-5ix4u-dae"
          ? "cyql"
          : formatId(publisher)}
      </p>
    </div>
  );
};

export default Meta;
