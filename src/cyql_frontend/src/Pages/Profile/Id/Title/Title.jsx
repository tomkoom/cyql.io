import React from "react";
import css from "./Title.module.css";

// utils
import { formatId } from "@utils/format";

// auth
import { useAuth } from "@context/AuthContext";

// state
import { useSelector } from "react-redux";
import { selectOwnsNFT } from "@state/profile";

const Title = () => {
  const ownsNFT = useSelector(selectOwnsNFT);
  const { principalIdStr } = useAuth();

  return (
    <div className={css.title}>
      <h2 className="pageTitle">{formatId(principalIdStr)}</h2>
      {ownsNFT && <span className={css.badge}>Hodl Gang</span>}
    </div>
  );
};

export default Title;
