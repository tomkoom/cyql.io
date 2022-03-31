import React, { useState } from "react";
import css from "./ExpandableText.module.css";

const ExpandableText = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={css.expandable}>
      <div
        className={css.expandable__content}
        style={{ maxHeight: expanded ? "none" : "1.25rem" }}
      >
        <p>{children}</p>
      </div>
      <button
        className={`${css.readMoreBtn} navlink`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
};

export default ExpandableText;
