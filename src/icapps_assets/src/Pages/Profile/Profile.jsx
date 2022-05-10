import React from "react";
import css from "./Profile.module.css";

// auth
import { useAuth } from "../../Context/AuthContext";

// state
import { useSelector } from "react-redux";
import { selectUpvotedProjects } from "../../State/upvotedProjects";
import { toApp } from "../../Routes/routes";

// components
import { UpvoteBtn } from "../../Components/index";

const Profile = () => {
  const { user, logOut } = useAuth();
  const upvotedProjects = useSelector(selectUpvotedProjects);
  const upvotedProjectsCopy = [...upvotedProjects];

  return (
    <div className={css.profile}>
      <div className={css.pageTitle}>
        <h2 className="pageTitle">Profile</h2>
        <span>Beta</span>
      </div>

      <div className={css.profile}>
        <div className={css.profileInfo}>
          <img src={user.photoURL} alt={`${user.displayName} userimg`} />
          <h6>{user.displayName}</h6>
        </div>
        <button className="secondaryBtn" onClick={logOut}>
          Sign out
        </button>
      </div>

      <div className={css.projects}>
        <h3>{upvotedProjectsCopy.length > 0 && `${upvotedProjectsCopy.length} `}Upvotes</h3>
        {upvotedProjectsCopy.length > 0 && (
          <ul className={css.projectsLi}>
            {upvotedProjectsCopy
              .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length)
              .map((project) => (
                <li className={css.projectsLiI} onClick={() => toApp(project.id)} key={project.idx}>
                  {project.logo && (
                    <img className={css.logo} src={project.logo} alt={`${project.name} logo`} />
                  )}

                  <div className={css.info}>
                    <h4 className={css.projectTitle}>{project.name}</h4>
                    <span className={css.tag}>{project.category}</span>
                    <p className={css.description}>{project.description}</p>
                  </div>

                  <div className={css.right} onClick={(e) => e.stopPropagation()}>
                    <UpvoteBtn idx={project.idx} upvotedBy={project.upvotedBy} />
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
