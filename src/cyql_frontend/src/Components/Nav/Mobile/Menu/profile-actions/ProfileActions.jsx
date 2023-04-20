import React from "react";
import css from "./ProfileActions.module.css";

// icons
import { iSignOut } from "@icons/Icons";

// utils
import { formatId } from "@utils/format";

// routes
import { toProfile } from "@routes/routes";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { IdImg } from "@components/Profile/index";

// state
import { useDispatch } from "react-redux";
import { setMobileMenuModal } from "@state/modals/modals";

const ProfileActions = () => {
  const dispatch = useDispatch();
  const { principalIdStr, signOut } = useAuth();

  const navigate = () => {
    toProfile();
    dispatch(setMobileMenuModal(false));
  };

  const handleSignOut = () => {
    signOut();
    dispatch(setMobileMenuModal(false));
  };

  return (
    <div className={css.profileActions}>
      <button className={css.btn} onClick={navigate}>
        <div className={css.idImg}>
          <IdImg size={36} />
        </div>
        {formatId(principalIdStr)}
      </button>

      <button className={css.btn} onClick={handleSignOut}>
        <span className={css.icon}>{iSignOut}</span> <span>sign out</span>
      </button>
    </div>
  );
};

export default ProfileActions;
