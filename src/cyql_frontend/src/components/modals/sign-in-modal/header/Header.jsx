import React from "react";
import css from "./Header.module.css";

// icons
import { CrossIcon } from "@/components/icons/index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setSignInModal } from "@/state/modals/modals";

const Header = () => {
  const dispatch = useAppDispatch();

  const closeSignInModal = () => {
    dispatch(setSignInModal(false));
  };

  return (
    <div className={css.header}>
      <CrossIcon onClick={closeSignInModal} />
      <h3 className={css.title}>choose your sign-in method</h3>
    </div>
  );
};

export default Header;
