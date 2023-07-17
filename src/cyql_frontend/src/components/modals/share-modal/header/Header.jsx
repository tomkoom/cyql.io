import React from "react";
import css from "./Header.module.css";

// icons
import { CrossIcon } from "@/components/icons/index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setShareModal } from "@/state/modals/shareModal";

const Header = ({ name }) => {
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(setShareModal(false));
  };

  return (
    <div className={css.header}>
      <h5 className={css.title}>Share {name} via</h5>
      <CrossIcon onClick={close} />
    </div>
  );
};

export default Header;
