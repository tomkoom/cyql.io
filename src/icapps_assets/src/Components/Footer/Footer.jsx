import React from "react";
import css from "./Footer.module.css";
import LogoComponent from "../../Assets/LogoComponent/LogoComponent";
import { Link, NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faComments,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";

const iconTwitter = (
  <FontAwesomeIcon icon={faTwitter} className={css.socIcon} color="#00acee" />
);
const iconDiscord = (
  <FontAwesomeIcon icon={faDiscord} className={css.socIcon} color="#5865f2" />
);

const iconPlus = (
  <FontAwesomeIcon icon={faPlusSquare} className={css.footIcon} />
);
const iconComments = (
  <FontAwesomeIcon icon={faComments} className={css.footIcon} />
);
const iconHeart = <FontAwesomeIcon icon={faHeart} className={css.footIcon} />;

const navItems = [
  { name: "Home", link: "/" },
  { name: "All Apps", link: "apps" },
  { name: "Upcoming NFT Sales", link: "upcoming" },
  { name: "NFT Stats", link: "nft" },
  { name: "Submit Your Project", link: "submit" },
];

const socLinks = [
  { id: "twitter", link: "https://twitter.com/DfinityApps", icon: iconTwitter },
  { id: "discord", link: "https://discord.gg/AnjyrfvvXX", icon: iconDiscord },
];

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

          <li className={css.footer__content__top__i__donation}>
            <div>{iconHeart}</div>
            <div>
              <h5 className={css.footer__content__top__i__linkBlock__title}>
                Donate
              </h5>
              <p className="bodyTextLight">
                icApps is developed and maintained by the IC enthusiasts. You
                can support futher development by making a donation 🐦
                <br />
                <span>
                  <a
                    href="https://dashboard.internetcomputer.org/account/edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1
                  </a>
                </span>
              </p>
            </div>
          </li>
        </ul>

        <div className={css.footer__content__middle}>
          {/* Logo */}
          <div className={css.footer__content__middle__i}>
            <div className={css.footer__content__middle__i__logo}>
              <LogoComponent />
              <p>
                IC projects <br /> community portal
              </p>
            </div>
          </div>

          <div className={css.footer__content__middle__i}>
            <ul className={css.footer__content__middle__i__navList}>
              {/* Nav Items*/}
              {navItems.map((navItem, i) => (
                <li key={i}>
                  <NavLink
                    exact
                    to={navItem.link}
                    replace
                    className={css.footer__content__middle__i__navList__i}
                    activeClassName={css.active}
                  >
                    {navItem.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Soc Links */}
          <div className={css.footer__content__middle__i}>
            <ul className={css.footer__content__middle__i__socLinks}>
              {socLinks.map(({ id, link, icon }) => (
                <li
                  className={css.footer__content__middle__i__socLinks__i}
                  key={id}
                >
                  <a
                    className={css.footer__content__middle__i__socLinks__item}
                    href={link}
                    id={id}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
