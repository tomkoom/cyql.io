import React from "react";
import css from "./Header.module.css";

// constants
import { c } from "../../../../../../constants/constants";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { EditBtn, Logo, ShareBtn, Title } from "./index";
import { UpvtBtn } from "@components/index";

const Header = ({ project }) => {
  const { principalIdStr } = useAuth();
  const isAdmin =
    principalIdStr === c.PLUG_ADMIN_1 ||
    principalIdStr === c.PLUG_ADMIN_2 ||
    principalIdStr === c.STOIC_ADMIN_1 ||
    principalIdStr === c.STOIC_ADMIN_2;

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
