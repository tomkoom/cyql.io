import React from "react";
import css from "./Edit.module.css";

const Edit = () => {
  return (
    <a
      className={css.edit}
      href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
      rel="noreferrer noopener"
      target="_blank"
    >
      Edit project
    </a>
  );
};

export default Edit;
