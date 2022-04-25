import React from "react";
import css from "./Profile.module.css";

// auth
import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
  const { user, logOut } = useAuth();
  return (
    <div className={css.profile}>
      <div className={css.profileTitle}>
        <h2 className="pageTitle">Profile</h2>
        <span>Beta</span>
      </div>

      <div className={css.profileContent}>
        <div className={css.profileInfo}>
          <img src={user.photoURL} alt={`${user.displayName} userimg`} />
          <h6>{user.displayName}</h6>
        </div>
        <button className="secondaryBtn" onClick={logOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
