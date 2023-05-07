import React from "react";
import css from "./Title.module.css";

// icons
import { iGithub, iCircleNodes, iMeteor } from "@icons/Icons";

const Title = ({ name, description, github, canister, grantee }) => {
  const format = (d) => {
    return d && d.length > 70 ? `${d.substring(0, 70)}…` : d;
  };

  return (
    <div className={css.title}>
      <div className={css.main}>
        <h3 className={css.name}>{name}</h3>
        <ul className={css.icons}>
          {github && <li id={css.open}>{iGithub}</li>}
          {canister && <li id={css.onchain}>{iCircleNodes}</li>}
          {grantee && <li id={css.grantee}>{iMeteor}</li>}
        </ul>
      </div>
      <p className={css.description}>{format(description)}</p>
    </div>
  );
};

export default Title;
