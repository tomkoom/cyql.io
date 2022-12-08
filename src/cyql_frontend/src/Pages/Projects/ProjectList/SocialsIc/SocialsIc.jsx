import React from "react";
import css from "./SocialsIc.module.css";

const SocialsIc = ({ dscvr, distrikt, openChat }) => {
  return (
    <ul className={css.socialsIc}>
      {dscvr && <li>Dscvr</li>}
      {distrikt && <li>Distrikt</li>}
      {openChat && <li>OpenChat</li>}
    </ul>
  );
};

export default SocialsIc;
