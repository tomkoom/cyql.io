import React, { useState, useEffect } from "react";
import css from "./Nav.module.css";
import logoImg from "../../../assets/logo.svg";
import k from "../../../../../k/k";
import { useWindowSize } from "./UseWindowSize";
import { deviceSizes } from "../../DeviceSizes";
import { navLinks } from "../../NavLinks/NavLinks";

// Components
import Modal from "./Modal/Modal";
import NavMenuMobile from "./NavMenuMobile";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  // faFireAlt,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../State/theme";

const iconBars = <FontAwesomeIcon icon={faBars} />;
// const iconFire = <FontAwesomeIcon icon={faFireAlt} />;
const iconSun = <FontAwesomeIcon icon={faSun} />;
const iconMoon = <FontAwesomeIcon icon={faMoon} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;

const socialLinks = [
  {
    name: "Twitter",
    link: "https://twitter.com/DfinityApps",
    icon: iconTwitter,
    color: "#00acee",
  },
  {
    name: "Discord",
    link: "https://discord.gg/qQ8MNv6Hju",
    icon: iconDiscord,
    color: "#5865f2",
  },
];

const Nav = () => {
  const [donateAmount, setDonateAmount] = useState("0");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [deviceWidth, deviceHeight] = useWindowSize();
  const [modalIsActive, setModalIsActive] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState();

  // state
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme.value);
  const projectsNum = useSelector((state) => state.siteData.projectsNum.value);
  const upcomingNftsNum = useSelector(
    (state) => state.siteData.upcomingNftsNum.value
  );
  const icpPrice = useSelector((state) => state.icpPrice.icpPrice);
  const icp24hPriceChange = +useSelector(
    (state) => state.icpPrice.icp24hPriceChange.value
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
      {/* top */}
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

      {/* mid */}
      <div className={css.divider} />
      <div className={css.nav__mid}>
        <div className={css.nav__mid__main}>
          {/* logo */}
          <button
            className={`${css.logo} navlink`}
            onClick={() => {
              // go home
              navLinks[0].link();
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <img src={logoImg} alt="icApps.xyz logo" />
            <h1>icApps</h1>
          </button>

          {/* soclinks */}
          <ul className={css.nav__mid__main__socLinks}>
            {socialLinks.map(({ name, link, icon }, i) => (
              <li
                className={css.nav__mid__main__socLinks__item}
                data-smlink={name}
                key={i}
              >
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* menu btn */}
        <div className={css.nav__menuBtn} onClick={() => setMenuIsOpen(true)}>
          {iconBars}
        </div>

        {deviceWidth < 1024 && menuIsOpen ? (
          <NavMenuMobile
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
          />
        ) : null}

        {/* navlinks */}
        <ul className={css.nav__list}>
          {navLinks.map(({ name, link }, i) => (
            <li className={css.nav__list__item} key={i}>
              <button
                className="navlink"
                onClick={() => {
                  link();
                  menuIsOpen ? setMenuIsOpen(false) : null;
                }}
              >
                {name}
              </button>
            </li>
          ))}

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

      {/* bottom */}
      <div className={css.divider} />
      <div className={css.nav__bottom}>
        <button
          className={css.themeSwitch}
          onClick={() => dispatch(setTheme(changeTheme(theme)))}
        >
          {theme === "light" ? iconSun : theme === "dark" ? iconMoon : null}
        </button>
        <div className={css.icpPriceBadge}>
          {/* <div className={css.icpPriceBadge__logo} /> */}
          <div>
            <p>ICP&nbsp;{`$${icpPrice}`}</p>&nbsp;
            <span
              className={css.icpPriceChange}
              style={
                icp24hPriceChange >= 0
                  ? { color: "#24a148" }
                  : { color: "#fa4d56" }
              }
            >{`${icp24hPriceChange.toFixed(2)}%`}</span>
            &nbsp;
            <span className={css.icpPriceChangeTime}>24h</span>
          </div>
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
