import React from "react";
import css from "./Menu.module.css";

// icons
import { CrossIcon } from "@/components/icons/_index";

// auth
import { useAuth } from "@/context/AuthContext";

// components
import { Navlinks, ProfileActions, SignInBtn } from "./index";
import { Price, Theme } from "@/components/ui/_index";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setMobileMenuModal, selectMobileMenuModal } from "@/state/modals/modals";

const Divider = () => <hr className={css.div} />;

const Menu = () => {
  const dispatch = useAppDispatch();
  const { userKey } = useAuth();
  const mobileMenu = useAppSelector(selectMobileMenuModal);

  return (
    mobileMenu && (
      <div className={css.menu}>
        <div className={css.content}>
          <div className={css.main}>
            <div className={css.crossIcon}>
              <CrossIcon onClick={() => dispatch(setMobileMenuModal(false))} />
            </div>

            <Navlinks />
            <Divider />
            {userKey === "" ? <SignInBtn /> : <ProfileActions />}

            <Divider />
            <div className={css.controls}>
              <Price />
              <Theme />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Menu;
