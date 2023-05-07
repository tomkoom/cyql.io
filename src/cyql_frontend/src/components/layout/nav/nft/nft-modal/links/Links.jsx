import React from "react";
import css from "./Links.module.css";

// icons
import { iExternalLink } from "@icons/Icons";

const Link = ({ type, url, text }) => {
  return (
    <a id={css[type]} className={css.link} href={url} rel="noreferrer noopener" target="_blank">
      {text} <span className={css.icon}>{iExternalLink}</span>
    </a>
  );
};

const Links = () => {
  return (
    <div className={css.links}>
      <Link type={"primary"} url={"https://entrepot.app/marketplace/ic-apps"} text={"buy"} />

      <Link
        type={"secondary"}
        url={
          "https://t5t44-naaaa-aaaah-qcutq-cai.raw.ic0.app/collection/dtlqp-nqaaa-aaaak-abwna-cai/summary"
        }
        text={"stats"}
      />
    </div>
  );
};

export default Links;
