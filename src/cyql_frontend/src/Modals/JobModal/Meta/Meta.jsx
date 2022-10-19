import React from "react";
import css from "./Meta.module.css";

// constants
import { c } from "../../../../../../constants/constants";

// utils
import { formatDate, formatId } from "../../../Utils/format";

// state
import { useSelector } from "react-redux";
import { selectActiveJob } from "../../../State/jobs/job";

const Meta = () => {
  const j = useSelector(selectActiveJob);

  return (
    <ul className={css.meta}>
      <li className={css.posted}>Posted {formatDate(j.submitted)}</li>
      <li className={css.by}>
        By {j.publisher === c.PLUG_ADMIN_1 ? "cyql" : formatId(j.publisher)}
      </li>
    </ul>
  );
};

export default Meta;
