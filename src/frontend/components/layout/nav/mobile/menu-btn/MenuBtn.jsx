import React from "react";
import css from "./MenuBtn.module.css";

// icons
import { iBars } from "@/components/icons/Icons";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setMobileMenuModal } from "@/state/modals/modals";

const MenuBtn = () => {
  const dispatch = useAppDispatch();
  return (
    <button className={css.btn} onClick={() => dispatch(setMobileMenuModal(true))}>
      {iBars}
    </button>
  );
};

export default MenuBtn;
