import React, { useState } from "react";
import css from "./ExpandableText.module.css";

const ExpandableText = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={css.expandable}>
      <div className={css.content} style={{ maxHeight: expanded ? "none" : "1.25rem" }}>
        <p>{children}</p>
      </div>
      <span className={css.btn} onClick={() => setExpanded(!expanded)}>
        {expanded ? "Read less" : "Read more"}
      </span>
    </div>
  );
};

export default ExpandableText;
