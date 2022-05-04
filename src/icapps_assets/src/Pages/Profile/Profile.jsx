import React from "react";
import css from "./Profile.module.css";

// auth
import { useAuth } from "../../Context/AuthContext";

// state
import { useSelector } from "react-redux";
import { selectUpvotedProjects } from "../../State/upvotedProjects";
import { toApp } from "../../Routes/routes";

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

      <div className={css.projects}>
        <h3>{upvotedProjects.length > 0 ? `${upvotedProjects.length} ` : ""}Upvotes</h3>
        {upvotedProjects.length > 0 && (
          <ul className={css.li}>
            {upvotedProjects.map((project) => (
              <li className={css.li__i} onClick={() => toApp(project.id)} key={project.idx}>
                {project.logo && (
                  <img className={css.logo} src={project.logo} alt={`${project.name} logo`} />
                )}
                <div className={css.info}>
                  <h4 className={css.projectTitle}>{project.name}</h4>
                  <span className={css.tag}>{project.category}</span>
                  <p className={css.description}>{project.description}</p>
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
