import React from "react";
import css from "./Published.module.css";

// utils
import { formatDate2 } from "@/utils/format";

const Published = ({ added }) => {
  return added ? <div className={css.published}>Published {formatDate2(added)}</div> : "";
};

export default Published;
