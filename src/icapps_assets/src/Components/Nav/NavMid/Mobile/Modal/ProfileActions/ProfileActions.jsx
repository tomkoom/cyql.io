import React from "react";
import css from "./ProfileActions.module.css";

// icons
import { iSignOut } from "../../../../../../Icons/Icons";

// auth
import { useAuth } from "../../../../../../Context/AuthContext";

// routes
import { toProfile } from "../../../../../../Routes/routes";

// state
import { useDispatch } from "react-redux";
import { setMobileMenuModal } from "../../../../../../State/modals";

const ProfileActions = () => {
  const dispatch = useDispatch();
  const { principalIdStr, signOut } = useAuth();
  const pIdStr = principalIdStr;

  const handleProfileActionClick = (action) => {
    action();
    dispatch(setMobileMenuModal(false));
  };

  return (
    <div className={css.profileActions}>
      <button onClick={() => handleProfileActionClick(toProfile)}>
        <img
          className={css.idImg}
          src={`https://avatars.dicebear.com/api/jdenticon/${pIdStr}.svg`}
          alt="id-img"
        />
        <div>
          <p>{pIdStr.substring(0, 5) + "..." + pIdStr.substring(pIdStr.length - 3)}</p>
          <p className={css.subtitle}>View Profile</p>
        </div>
      </button>
      <button onClick={() => handleProfileActionClick(signOut)}>
        <span className={css.icon}>{iSignOut}</span> Sign out
      </button>
    </div>
  );
};

export default ProfileActions;
