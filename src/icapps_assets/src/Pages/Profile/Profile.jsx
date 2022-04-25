import React from "react";
import css from "./Profile.module.css";

// auth
import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
  const { user, logOut } = useAuth();
  return (
    <div className={css.profile}>
      <h2 className="pageTitle">Profile</h2>
      <div className={css.profileContent}>
        <div className={css.profileInfo}>
          <img src={user.photoURL} alt={`${user.displayName} user-img`} />
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
