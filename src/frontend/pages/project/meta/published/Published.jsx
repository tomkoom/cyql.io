import React from "react";
import css from "./Published.module.css";

// utils
import { formatDate } from "@/utils/format";

const Published = ({ added }) => {
  return added ? <div className={css.published}>Published {formatDate(added)}</div> : "";
};

export default Published;
