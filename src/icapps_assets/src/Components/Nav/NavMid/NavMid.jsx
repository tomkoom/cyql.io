import React from "react";
import css from "./NavMid.module.css";
import k from "../../../../../../k/k";

// components
import { Logo } from "../../index";
import NavMobileMenu from "../NavMobileMenu/NavMobileMenu";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";

// icons
import { iTwitter, iDiscord, iBars, iFire } from "../../../Icons/Icons";

// navlinks
import { toHome, toAdmin, toProfile, toSubmit, toUpcoming, toApps } from "../../../Routes/routes";

// auth
import { useAuth } from "../../../Context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectMobileMenuModal, setMobileMenuModal } from "../../../State/modals";
import SignInBtn from "../SignInBtn/SignInBtn";
import NavBtn from "../NavBtn/NavBtn";

const socialLinks = [
  {
    name: "Twitter",
    link: "https://twitter.com/DfinityApps",
    icon: iTwitter,
    color: "#00acee",
  },
  {
    name: "Discord",
    link: "https://discord.gg/qQ8MNv6Hju",
    icon: iDiscord,
    color: "#5865f2",
  },
];

const NavMid = () => {
  const [deviceWidth] = useWindowSize();
  const { user } = useAuth();

  const dispatch = useDispatch();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  return (
    <div className={css.nav}>
      <div className={css.content}>
        {/* logo */}
        <button
          className="navlink"
          onClick={() => {
            toHome();
            mobileMenuModal && dispatch(setMobileMenuModal(false));
          }}
        >
          <Logo />
        </button>

        {/* soclinks */}
        <ul className={css.socLinks}>
          {socialLinks.map(({ name, link, icon }, i) => (
            <li className={css.socLinks__i} data-smlink={name} key={i}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* menu btn */}
      <div className={css.menuBtn} onClick={() => dispatch(setMobileMenuModal(true))}>
        {iBars}
      </div>

      {/* open mobile menu if width is less than 1024 */}
      {deviceWidth < 1024 && mobileMenuModal && <NavMobileMenu />}

      {/* navlinks */}
      <ul className={css.navlinks}>
        <li className={css.navlinksI}>
          <NavBtn btnName="Projects" navTo={toApps} icon="" />
        </li>

        <li className={css.navlinksI}>
          <NavBtn btnName="Upcoming NFT Sales" navTo={toUpcoming} icon={iFire} />
        </li>

        <li className={css.navlinksI}>
          <NavBtn btnName="Submit" navTo={toSubmit} icon="" />
        </li>

        {user && (
          <li className={css.navlinksI}>
            <NavBtn btnName="Profile" navTo={toProfile} icon="" />
          </li>
        )}

        {((user && user.uid === k.TWITTER_ADMIN_1) || (user && user.uid === k.TWITTER_ADMIN_2)) && (
          <li className={css.navlinksI}>
            <NavBtn btnName="Admin" navTo={toAdmin} icon="" />
          </li>
        )}

        {!user && (
          <li className={css.navlinksI}>
            <div id={css.signInBtn}>
              <SignInBtn />
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavMid;
