import React from "react";
import css from "./Menu.module.css";

// icons
import { CrossIcon } from "@icons/index";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { Navlinks, ProfileActions, SignInBtn } from "./index";
import { Price } from "@components/index";
import { Theme } from "@ui-elements/index";

// state
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuModal, selectMobileMenuModal } from "@state/modals/modals";

const Divider = () => <hr className={css.div} />;

const Menu = () => {
  const dispatch = useDispatch();
  const { principalId } = useAuth();
  const mobileMenu = useSelector(selectMobileMenuModal);

  return (
    mobileMenu && (
      <div className={css.menu}>
        <div className={css.content}>
          <div className={css.main}>
            <Navlinks />
            <Divider />
            {!principalId ? <SignInBtn /> : <ProfileActions />}

            <Divider />
            <div className={css.controls}>
              <Price />
              <Theme />
            </div>
          </div>

          <div className={css.crossIcon}>
            <CrossIcon onClick={() => dispatch(setMobileMenuModal(false))} />
          </div>
        </div>
      </div>
    )
  );
};

export default Menu;
