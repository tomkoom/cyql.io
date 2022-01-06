import React from "react";
import css from "./Footer.module.css";
import LogoComponent from "../../Assets/LogoComponent/LogoComponent";
import { Link } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faComments,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";

const iconDiscord = (
  <FontAwesomeIcon icon={faDiscord} className={css.socIcon} color="#5865f2" />
);
const iconTwitter = (
  <FontAwesomeIcon icon={faTwitter} className={css.socIcon} color="#00acee" />
);
const iconPlus = (
  <FontAwesomeIcon icon={faPlusSquare} className={css.footIcon} />
);
const iconComments = (
  <FontAwesomeIcon icon={faComments} className={css.footIcon} />
);
const iconHeart = <FontAwesomeIcon icon={faHeart} className={css.footIcon} />;

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footer__content}>
        <ul className={css.footer__content__top}>
          <li className={css.footer__content__top__i}>
            <Link
              to="/submit"
              className={css.footer__content__top__i__linkBlock}
            >
              <div>{iconPlus}</div>
              <div>
                <h5 className={css.footer__content__top__i__linkBlock__title}>
                  Submit your project
                </h5>
                <p className="bodyTextLight">
                  Submit your project and get traction from the IC community.
                </p>
              </div>
            </Link>
          </li>
          <li className={css.footer__content__top__i}>
            <a
              className={css.footer__content__top__i__linkBlock}
              href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
              rel="noreferrer noopener"
              target="_blank"
            >
              <div>{iconComments}</div>
              <div>
                <h5 className={css.footer__content__top__i__linkBlock__title}>
                  Reach out
                </h5>
                <p className="bodyTextLight">
                  Didn't find what you were looking for or want to collaborate?
                  Reach out for us, we are happy to support and cooperate.
                </p>
              </div>
            </a>
          </li>
          <li className={css.footer__content__top__i}>
            <a className={css.footer__content__top__i__linkBlock}>
              <div>{iconHeart}</div>
              <div>
                <h5 className={css.footer__content__top__i__linkBlock__title}>
                  Donate
                </h5>
                <p className="bodyTextLight">
                  icApps is a community-run project. By making a donation you
                  are supporting its development.
                </p>
              </div>
            </a>
          </li>
        </ul>

        <div className={css.footer__content__middle}>
          {/* Logo */}
          <div className={css.footer__content__middle__i}>
            <div className={css.footer__content__middle__i__logo}>
              <LogoComponent />
              <p className="subtitle">IC-powered projects community portal</p>
            </div>
          </div>

          {/* Links */}
          <div className={css.footer__content__middle__i}>
            <a
              href="https://twitter.com/DfinityApps"
              id="twitter"
              rel="noreferrer noopener"
              target="_blank"
            >
              {iconTwitter} Twitter
            </a>
            <a
              href="https://discord.gg/AnjyrfvvXX"
              id="discord"
              rel="noreferrer noopener"
              target="_blank"
            >
              {iconDiscord} Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
