import React from "react";
import css from "./Publisher.module.css";

// utils
import { formatId } from "../../../../../Utils/format";

// auth
import { useAuth } from "../../../../../Context/AuthContext";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../../../../../State/modals";

const Publisher = () => {
  const dispatch = useDispatch();
  const { principalIdStr } = useAuth();

  const handleClick = () => {
    dispatch(setSignInModal(true));
  };

  return (
    <div className={css.publisher}>
      {principalIdStr ? (
        <span className={css.badge}>{formatId(principalIdStr)}</span>
      ) : (
        <button className={css.connectWalletBtn} onClick={handleClick}>
          Connect your wallet
        </button>
      )}
    </div>
  );
};

export default Publisher;
