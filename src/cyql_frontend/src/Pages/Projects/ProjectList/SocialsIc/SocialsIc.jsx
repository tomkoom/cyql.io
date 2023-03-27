import React from "react";
import css from "./SocialsIc.module.css";

const SocialsIc = ({ dscvr, distrikt, openChat, taggr, seers, nuance, catalyze }) => {
  return (
    <ul className={css.socialsIc}>
      {dscvr && <li>Dscvr</li>}
      {distrikt && <li>Distrikt</li>}
      {openChat && <li>OpenChat</li>}
      {taggr && <li>TAGGR</li>}
      {seers && <li>Seers</li>}
      {nuance && <li>Nuance</li>}
      {catalyze && <li>Catalyze</li>}
    </ul>
  );
};

export default SocialsIc;
