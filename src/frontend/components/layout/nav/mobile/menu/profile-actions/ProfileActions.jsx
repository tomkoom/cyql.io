import React from "react";
import css from "./ProfileActions.module.css";

// icons
import { iSignOut } from "@/components/icons/Icons";

// utils
import { formatId } from "@/utils/format";

// hooks
import useNav from "@/hooks/useNav";

// auth
import { useAuth } from "@/context/Auth";

// components
import { IdImg } from "@/components/ui/_index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setMobileMenuModal } from "@/state/modals/modals";

const ProfileActions = () => {
  const dispatch = useAppDispatch();
  const { toProfile } = useNav();
  const { userId, logout } = useAuth();

  const navigate = () => {
    toProfile();
    dispatch(setMobileMenuModal(false));
  };

  const handleSignOut = () => {
    logout();
    dispatch(setMobileMenuModal(false));
  };

  return (
    <div className={css.profileActions}>
      <button className={css.btn} onClick={navigate}>
        <div className={css.idImg}>
          <IdImg sizePx="36" />
        </div>
        {formatId(userId)}
      </button>

      <button className={css.btn} onClick={handleSignOut}>
        <span className={css.icon}>{iSignOut}</span> <span>sign out</span>
      </button>
    </div>
  );
};

export default ProfileActions;
