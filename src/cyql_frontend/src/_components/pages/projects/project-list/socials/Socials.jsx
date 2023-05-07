import React from "react";
import css from "./Socials.module.css";

// icons
import { iTwitter, iDiscord, iTelegram, iGithub, iMedium } from "@icons/Icons";

const Socials = ({ twitter, discord, telegram, github, medium }) => {
  return (
    <ul className={css.socials}>
      {twitter && <li>{iTwitter}</li>}
      {discord && <li>{iDiscord}</li>}
      {telegram && <li>{iTelegram}</li>}
      {github && <li>{iGithub}</li>}
      {medium && <li>{iMedium}</li>}
    </ul>
  );
};

export default Socials;
