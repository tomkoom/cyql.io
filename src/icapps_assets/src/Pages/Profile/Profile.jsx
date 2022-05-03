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
      <div className={css.title}>
        <h2 className="pageTitle">Profile</h2>
        <span>Beta</span>
      </div>

      <div className={css.content}>
        <div className={css.info}>
          <img src={user.photoURL} alt={`${user.displayName} userimg`} />
          <h6>{user.displayName}</h6>
        </div>
        <button className="secondaryBtn" onClick={logOut}>
          Sign out
        </button>
      </div>

      <div className={css.upvotedProjects}>
        <h3>{upvotedProjects.length > 0 ? `${upvotedProjects.length} ` : ""}Upvotes</h3>
        {upvotedProjects.length > 0 && (
          <ul className={css.upvotedProjectsLi}>
            {upvotedProjects.map((upvotedProject) => (
              <li className={css.upvotedProjectsLi__i} key={upvotedProject.idx}>
                {upvotedProject.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
