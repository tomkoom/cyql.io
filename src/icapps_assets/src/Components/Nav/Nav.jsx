import React, { useState, useEffect } from "react";
import css from "./Nav.module.css";
import Logo from "../../../assets/logo.svg";
import k from "../../../../../k/k";
import { useWindowSize } from "./useWindowSize";
import { deviceSizes } from "../../deviceSizes";
import Modal from "./Modal/Modal";

// Routes
import {
  toHome,
  toApps,
  toUpcoming,
  toNft,
  toSubmit,
} from "../../Routes/routes";

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

// Redux
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

  // State
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme.value);
  const projectsNum = useSelector((state) => state.siteData.projectsNum.value);
  const upcomingNftsNum = useSelector(
    (state) => state.siteData.upcomingNftsNum.value
  );

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
        <ul>
          <li>
            Projects:{" "}
            <button className="navlink" onClick={() => toApps()}>
              {projectsNum}
            </button>
          </li>
          <li>
            Upcoming NFTs:{" "}
            <button className="navlink" onClick={() => toUpcoming()}>
              {upcomingNftsNum}
            </button>
          </li>
          <li>
            Featured:{" "}
            <a
              href="https://entrepot.app/marketplace/poked"
              rel="noreferrer noopener"
              target="_blank"
            >
              PokedBots
            </a>
          </li>
        </ul>
      </div>

      {/* divider */}
      <div className={css.divider} />
      <div className={css.nav__mid}>
        <div className={css.nav__logoContainer}>
          <button className="navlink" onClick={() => toHome()}>
            <div
              className={css.nav__logoContainer__logo}
              onClick={() => {
                menuIsOpen ? setMenuIsOpen(false) : null;
              }}
            >
              <img src={Logo} alt="icApps.xyz logo" />
              <h1>icApps</h1>
            </div>
          </button>

          <ul className={css.nav__logoContainer__socialLinks}>
            {socialLinks.map((sl, i) => (
              <li
                className={css.nav__logoContainer__socialLinks__item}
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
            <button className="navlink" onClick={() => toHome()}>
              Home
            </button>
          </li>

          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <button className="navlink" onClick={() => toApps()}>
              Apps
            </button>
          </li>

          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <button
              className="navlink"
              onClick={() => toUpcoming()}
              id={css.upcomingNfts}
            >
              <span id={css.fireIcon}>{iconFire}</span>&nbsp;Upcoming NFT Sales
            </button>
          </li>

          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <button className="navlink" onClick={() => toNft()}>
              NFT Stats
            </button>
          </li>

          <li
            className={css.nav__list__item}
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <button className="navlink" onClick={() => toSubmit()}>
              Submit Your Project
            </button>
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
      {/* divider */}
      <div className={css.divider} />
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
