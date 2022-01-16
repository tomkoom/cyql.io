import React, { useState, useEffect } from "react";
import css from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import k from "../../../../../k/k";
import { useWindowSize } from "./useWindowSize";
import { deviceSizes } from "../../deviceSizes";
import Modal from "./Modal/Modal";

// Framet Motion
import { motion } from "framer-motion";
import { btnVariants } from "../../motionVariants";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faTimes,
  faBars,
  faFireAlt,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

// State
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../Redux/themeSlice";

const iconTimes = <FontAwesomeIcon icon={faTimes} />;
const iconBars = <FontAwesomeIcon icon={faBars} />;
const iconFire = <FontAwesomeIcon icon={faFireAlt} />;
const iconSun = <FontAwesomeIcon icon={faSun} />;
const iconMoon = <FontAwesomeIcon icon={faMoon} />;

const socialLinks = [
  {
    name: "Twitter",
    link: "https://twitter.com/DfinityApps",
    icon: faTwitter,
    color: "#00acee",
  },
  {
    name: "Discord",
    link: "https://discord.gg/qQ8MNv6Hju",
    icon: faDiscord,
    color: "#5865f2",
  },
];

const Nav = () => {
  const [donateAmount, setDonateAmount] = useState("0");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [deviceWidth, deviceHeight] = useWindowSize();
  const [modalIsActive, setModalIsActive] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState();
  const icpPrice = useSelector((state) => state.icpPrice.icpPrice);

  // state
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme.value);

  // donate btn
  const updateDonateAmount = (e) => {
    setDonateAmount(e.target.value);
  };

  const handleDonateBtnClick = async (el) => {
    el.target.disabled = true;
    const hasAllowed = await window.ic?.plug?.requestConnect();

    if (hasAllowed) {
      const requestTransferArg = {
        to: k.DONATION_WALLET,
        amount: donateAmount * 100000000,
      };

      const transfer = await window.ic?.plug?.requestTransfer(
        requestTransferArg
      );

      setTransactionStatus(transfer ? 1 : null);
    }

    setTimeout(function () {
      el.target.disabled = false;
    }, 5000);
  };

  //  reset menu
  function resetMenu() {
    if (deviceWidth > deviceSizes.desktop) {
      setMenuIsOpen(false);
    }
  }

  useEffect(() => {
    resetMenu();
  }, [deviceWidth]);

  // dark/light theme switch
  const changeTheme = (theme) => {
    return {
      light: { value: "dark" },
      dark: { value: "light" },
    }[theme];
  };

  return (
    <nav className={css.nav}>
      <div className={css.nav__top}>
        <div className={css.nav__logoContainer}>
          <NavLink exact to="/" replace>
            <div
              className={css.nav__logoContainer__logo}
              onClick={() => {
                menuIsOpen ? setMenuIsOpen(false) : null;
              }}
            >
              <img src={Logo} width="34" height="34" alt="icApps.xyz Logo" />
              <h1>icApps</h1>
            </div>
          </NavLink>

          <ul className={css.nav__logoContainer__socialLinks}>
            {socialLinks.map((sl, i) => (
              <li
                className={css.nav__logoContainer__socialLinks__item}
                variants={btnVariants}
                whileHover="whileHover"
                data-smlink={sl.name}
                key={i}
              >
                <a href={sl.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={sl.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* MENU BTN */}
        <div
          className={css.nav__menuBtn}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          {menuIsOpen ? iconTimes : iconBars}
        </div>

        <ul className={menuIsOpen ? css.nav__list__active : css.nav__list}>
          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <NavLink
              exact
              to="/"
              replace
              className={css.nav__list__item__content}
              activeClassName={css.nav__list__item__active}
            >
              Home
            </NavLink>
          </li>

          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <NavLink
              exact
              to="/apps"
              replace
              className={css.nav__list__item__content}
              activeClassName={css.nav__list__item__active}
            >
              Apps
            </NavLink>
          </li>

          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <NavLink
              exact
              to="/upcoming"
              replace
              className={css.nav__list__item__content}
              activeClassName={css.nav__list__item__active}
              id={css.upcomingNfts}
            >
              <span id={css.fireIcon}>{iconFire}</span>&nbsp;Upcoming NFT Sales
            </NavLink>
          </li>

          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <NavLink
              exact
              to="/nft"
              replace
              className={css.nav__list__item__content}
              activeClassName={css.nav__list__item__active}
            >
              NFT Stats
            </NavLink>
          </li>

          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <NavLink
              exact
              to="/submit"
              replace
              className={css.nav__list__item__content}
              activeClassName={css.nav__list__item__active}
            >
              Submit Your Project
            </NavLink>
          </li>

          <li className={`${css.nav__list__item} ${css.donateContainer}`}>
            <div
              className={css.donateBtn}
              onClick={() => setModalIsActive(true)}
            >
              <p>Donate</p>
            </div>
          </li>
        </ul>
      </div>

      <div className={css.nav__bottom}>
        <button
          className={css.themeSwitch}
          onClick={() => dispatch(setTheme(changeTheme(theme)))}
        >
          {theme === "light" ? iconSun : theme === "dark" ? iconMoon : null}
        </button>
        <div className={css.icpPriceBadge}>
          <div className={css.icpPriceBadge__logo}></div>
          {`$${icpPrice}`}
        </div>
        {/* lang */}
      </div>

      <Modal
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
        updateDonateAmount={updateDonateAmount}
        donateAmount={donateAmount}
        handleDonateBtnClick={handleDonateBtnClick}
        transactionStatus={transactionStatus}
      />
    </nav>
  );
};

export default Nav;
