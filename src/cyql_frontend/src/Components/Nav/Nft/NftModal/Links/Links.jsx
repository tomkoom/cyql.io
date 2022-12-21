import React from "react";
import css from "./Links.module.css";

// icons
import { iExternalLink } from "@icons/Icons";

const Links = () => {
  return (
    <div className={css.links}>
      <a
        id={css.primary}
        className={css.link}
        href="https://entrepot.app/marketplace/ic-apps"
        rel="noreferrer noopener"
        target="_blank"
      >
        Trade <span className={css.icon}>{iExternalLink}</span>
      </a>

      <a
        id={css.secondary}
        className={css.link}
        href="https://t5t44-naaaa-aaaah-qcutq-cai.raw.ic0.app/collection/dtlqp-nqaaa-aaaak-abwna-cai/summary"
        target="_blank"
        rel="noreferrer noopener"
      >
        Stats <span className={css.icon}>{iExternalLink}</span>
      </a>
    </div>
  );
};

export default Links;
