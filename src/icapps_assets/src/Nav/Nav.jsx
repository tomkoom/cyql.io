import React, { useState, useEffect } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import k from "../../../../k/k";
import { useWindowSize } from "./UseWindowSize";
import { deviceSizes } from "../DeviceSizes";

// FRAMER MOTION
import { motion } from "framer-motion";
import { btnVariants } from "../MotionVariants";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";

const iconTimes = <FontAwesomeIcon icon={faTimes} color="#fff" />;
const iconBars = <FontAwesomeIcon icon={faBars} color="#fff" />;

const Nav = () => {
  const [icpPrice, setIcpPrice] = useState("");
  const [donateAmount, setDonateAmount] = useState("0.2");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [deviceWidth, deviceHeight] = useWindowSize();

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

  // ICP price
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("Coingecko ICP price request was not successfull.");
        }
      })
      .then((data) => setIcpPrice(data["internet-computer"].usd))
      .catch((error) => console.log("Error"));
  }, []);

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
    <nav className="nav">
      <div className="nav__logo-container">
        <NavLink exact to="/" replace>
          <div
            className="nav__logo-container__logo"
            onClick={() => {
              menuIsOpen ? setMenuIsOpen(false) : null;
            }}
          >
            <img src={Logo} width="34" height="34" alt="icApps.xyz Logo" />
            <h1>icApps</h1>
          </div>
        </NavLink>
        <motion.div
          className="nav__logo-container__social-icons"
          variants={btnVariants}
          whileHover="whileHover"
        >
          <a
            href="https://twitter.com/DfinityApps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} color="#1D9BF0" />
          </a>
        </motion.div>
        <div className="icp-price-badge">
          <div className="icp-price-badge__logo"></div>
          {`$${icpPrice}`}
        </div>
      </div>

      {/* MENU BTN */}
      <motion.div
        className="nav__menu-btn"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {menuIsOpen ? iconTimes : iconBars}
      </motion.div>

      <ul className={menuIsOpen ? "nav__list__active" : "nav__list"}>
        <li
          className="nav__list__item"
          onClick={() => {
            menuIsOpen ? setMenuIsOpen(false) : null;
          }}
        >
          <NavLink
            exact
            to="/upcoming"
            replace
            className="nav__list__item__content black"
            activeClassName="nav__list__item__active"
          >
            Upcoming NFT Sales
          </NavLink>
        </li>

        <li
          className="nav__list__item"
          onClick={() => {
            menuIsOpen ? setMenuIsOpen(false) : null;
          }}
        >
          <NavLink
            exact
            to="/nft"
            replace
            className="nav__list__item__content"
            activeClassName="nav__list__item__active"
          >
            NFT Collections
          </NavLink>
        </li>

        <li
          className="nav__list__item"
          onClick={() => {
            menuIsOpen ? setMenuIsOpen(false) : null;
          }}
        >
          <NavLink
            exact
            to="/developers"
            replace
            className="nav__list__item__content"
            activeClassName="nav__list__item__active"
          >
            Developers
          </NavLink>
        </li>

        <li
          className="nav__list__item"
          onClick={() => {
            menuIsOpen ? setMenuIsOpen(false) : null;
          }}
        >
          <NavLink
            exact
            to="/submit"
            replace
            className="nav__list__item__content"
            activeClassName="nav__list__item__active"
          >
            Submit Your App
          </NavLink>
        </li>

        {/* <li
          className="nav__list__item"
          onClick={() => {
            menuIsOpen ? setMenuIsOpen(false) : null;
          }}
        >
          <a
            href="https://forms.gle/tsfFSEZki6mqWidy6"
            target="_blank"
            rel="noopener noreferrer"
            className="nav__list__item__content"
          >
            Submit Your App
          </a>
        </li> */}

        <li className="nav__list__item donate-container">
          <input
            className="donate-amount-input"
            type="number"
            min="0"
            onChange={updateDonateAmount}
            value={donateAmount}
          />
          <button className="donate-btn" onClick={handleDonateBtnClick}>
            Donate {donateAmount} ICP
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
