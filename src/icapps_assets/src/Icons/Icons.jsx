// fontawesome
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faBars, faTh } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faTelegramPlane,
  faDiscord,
  faMedium,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

// solid
const iLink = <FontAwesomeIcon icon={faLink} />;
const iBars = <FontAwesomeIcon icon={faBars} />;
const iTh = <FontAwesomeIcon icon={faTh} />;

// brands
const iTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iGithub = <FontAwesomeIcon icon={faGithub} />;
const iTelegram = <FontAwesomeIcon icon={faTelegramPlane} />;
const iMedium = <FontAwesomeIcon icon={faMedium} />;

export { iLink, iBars, iTh, iTwitter, iDiscord, iGithub, iTelegram, iMedium };
