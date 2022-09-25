import React from "react";
import css from "./ProfileActions.module.css";

// icons
import { iSignOut } from "../../../../../Icons/Icons";

// utils
import { formatId } from "../../../../../Utils/format";

// routes
import { toProfile } from "../../../../../Routes/routes";

// auth
import { useAuth } from "../../../../../Context/AuthContext";

// components
import { IdImg } from "../../../../Profile/index";

// state
import { useDispatch } from "react-redux";
import { setMobileMenuModal } from "../../../../../State/modals";

const ProfileActions = () => {
  const dispatch = useDispatch();
  const { principalIdStr, signOut } = useAuth();

  const clickProfileActionItem = (action) => {
    action();
    dispatch(setMobileMenuModal(false));
  };

  return (
    <div className={css.profileActions}>
      <button onClick={() => clickProfileActionItem(toProfile)}>
        <IdImg size={40} />
        <div>
          <p className={css.text}>{formatId(principalIdStr)}</p>
          <p className={css.subtitle}>View Profile</p>
        </div>
      </button>
      <button onClick={() => clickProfileActionItem(signOut)}>
        <span className={css.icon}>{iSignOut}</span>
        <p className={css.text}>Sign out</p>
      </button>
    </div>
  );
};

export default ProfileActions;
