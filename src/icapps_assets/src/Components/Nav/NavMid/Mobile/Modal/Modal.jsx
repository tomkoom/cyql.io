import React from "react";
import css from "./Modal.module.css";

// icons
import { iTwitter, iDiscord, iTimes, iFire } from "../../../../../Icons/Icons";

// components
import NavLink from "../NavLink/NavLink";

// routes
import { toApps, toUpcoming, toSubmit } from "../../../../../Routes/routes";

// state
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuModal, selectMobileMenuModal } from "../../../../../State/modals";

const Modal = () => {
  const dispatch = useDispatch();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  return (
    <div>
      {mobileMenuModal ? (
        <div className={css.modal} onClick={() => dispatch(setMobileMenuModal(false))}>
          <div className={css.content} onClick={(e) => e.stopPropagation()}>
            <div className={css.main}>
              <div className={css.navlinks}>
                <NavLink label="Projects" to={toApps} icon="" />
                <NavLink label="Upcoming" to={toUpcoming} icon={iFire} />
                <NavLink label="Submit" to={toSubmit} icon="" />
              </div>

              <div className={css.socials}>
                <a
                  className={css.socialsI}
                  id={css.twitter}
                  href="https://twitter.com/DfinityApps"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {iTwitter}
                </a>
                <a
                  className={css.socialsI}
                  id={css.discord}
                  href="https://discord.gg/AnjyrfvvXX"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {iDiscord}
                </a>
              </div>
            </div>

            <button className={css.closeBtn} onClick={() => dispatch(setMobileMenuModal(false))}>
              {iTimes}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
