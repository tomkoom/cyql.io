import React from "react";
import css from "./Profile.module.css";

// auth
import { useAuth } from "../../Context/AuthContext";

// state
import { useSelector } from "react-redux";
import { selectUpvotedProjects } from "../../State/upvotedProjects";

const Profile = () => {
  const { user, logOut } = useAuth();
  const upvotedProjects = useSelector(selectUpvotedProjects);

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

      <button onClick={() => console.log(upvotes)}>123</button>

      <div className={css.upvotes}>
        <h3>Upvotes</h3>
        {upvotes && (
          <div className={css.upvotesContent}>
            {upvotedProjects.map((upvotedProject) => (
              <div key={upvotedProject.idx}>{upvotedProject.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
