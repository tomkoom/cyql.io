import React from "react";
import css from "./Navlink.module.css";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setMobileMenuModal } from "@/state/modals/modals";

const Navlink = ({ label, route, icon }) => {
  const dispatch = useAppDispatch();
  const navigate = () => {
    route();
    dispatch(setMobileMenuModal(false));
  };

  return (
    <button className={css.navlink} onClick={navigate}>
      {icon && <span className={css.icon}>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Navlink;
