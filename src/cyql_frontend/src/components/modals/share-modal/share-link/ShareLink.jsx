import React, { useState } from "react";
import css from "./ShareLink.module.css";

const ShareLink = () => {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className={css.shareLink}>
      <label className={css.label}>Or copy url</label>
      <div className={css.field}>
        <input className={css.input} type="text" value={url} readOnly={true} />
        <button className={css.btn} onClick={() => !copied && copy()}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ShareLink;
