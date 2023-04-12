import React from "react";
import css from "./Header.module.css";

// constants
import { plugAdmin1, plugAdmin2, stoicAdmin1, stoicAdmin2 } from "@constants/constants";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { EditBtn, Logo, ShareBtn, Title } from "./index";
import { UpvtBtn } from "@components/index";

const Header = ({ project }) => {
  const { principalIdStr } = useAuth();
  const isAdmin =
    principalIdStr === plugAdmin1 ||
    principalIdStr === plugAdmin2 ||
    principalIdStr === stoicAdmin1 ||
    principalIdStr === stoicAdmin2;

  return (
    <div className={css.header}>
      <div className={css.main}>
        {project.logo && <Logo logo={project.logo} name={project.name} />}
        <Title
          name={project.name}
          grantee={project.grantee}
          category={project.category}
          tags={project.tags}
        />
      </div>

      <div className={css.controls}>
        {isAdmin && <EditBtn project={project} />}
        <ShareBtn />
        <div className={css.btnContainer}>
          <UpvtBtn id={project.id} upvotedBy={project.upvotedBy} location="project" />
        </div>
      </div>
    </div>
  );
};

export default Header;
