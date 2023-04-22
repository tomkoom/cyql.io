import React from "react";
import css from "./SocialsIc.module.css";

const SocialsIc = ({ dscvr, distrikt, openchat, taggr, seers, nuance, catalyze, funded }) => {
  return (
    <ul className={css.socialsIc}>
      {dscvr && <li>Dscvr</li>}
      {distrikt && <li>Distrikt</li>}
      {openchat && <li>OpenChat</li>}
      {taggr && <li>#TAGGR</li>}
      {seers && <li>Seers</li>}
      {nuance && <li>Nuance</li>}
      {catalyze && <li>Catalyze</li>}
      {funded && <li>Funded</li>}
    </ul>
  );
};

export default SocialsIc;
