import React, { useState, useEffect } from "react";
import css from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import k from "../../../../../k/k";
import { useWindowSize } from "./useWindowSize";
import { deviceSizes } from "../../DeviceSizes";
import Modal from "./Modal/Modal";

// FRAMER MOTION
import { motion } from "framer-motion";
import { btnVariants } from "../../MotionVariants";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";

// redux
import { useSelector } from "react-redux";

const iconTimes = <FontAwesomeIcon icon={faTimes} color="#fff" />;
const iconBars = <FontAwesomeIcon icon={faBars} color="#fff" />;

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
  const [donateAmount, setDonateAmount] = useState("0.2");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [deviceWidth, deviceHeight] = useWindowSize();
  const [modalIsActive, setModalIsActive] = useState(false);

  // redux
  const icpPrice = useSelector((state) => state.icpPrice.icpPrice);

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
      await window.ic?.plug?.requestTransfer(requestTransferArg);
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

  return (
    <nav className={css.nav}>
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

        <div className={css.icpPriceBadge}>
          <div className={css.icpPriceBadge__logo}></div>
          {`$${icpPrice}`}
        </div>
      </div>

      {/* MENU BTN */}
      <motion.div
        className={css.nav__menuBtn}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {menuIsOpen ? iconTimes : iconBars}
      </motion.div>

      <ul className={menuIsOpen ? css.nav__list__active : css.nav__list}>
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
            Upcoming NFT Sales
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
            to="/developers"
            replace
            className={css.nav__list__item__content}
            activeClassName={css.nav__list__item__active}
          >
            Developers
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
            Submit Your App
          </NavLink>
        </li>

        <li className={`${css.nav__list__item} ${css.donateContainer}`}>
          <input
            className={css.donateAmountInput}
            type="number"
            min="0"
            onChange={updateDonateAmount}
            value={donateAmount}
          />
          <button className={css.donateBtn} onClick={handleDonateBtnClick}>
            Donate {donateAmount} ICP
          </button>
        </li>

        {/* <li className={`${css.nav__list__item} ${css.donateContainer}`}>
          <button
            className={css.donateBtn}
            onClick={() => setModalIsActive(true)}
          >
            Donate
          </button>
        </li> */}
      </ul>
      {/* <Modal modalIsActive={modalIsActive} setModalIsActive={setModalIsActive}>
        <h3>Enter donation amount</h3>
      </Modal> */}
    </nav>
  );
};

export default Nav;
