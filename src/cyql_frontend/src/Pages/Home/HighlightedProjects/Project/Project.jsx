import React from "react";
import css from "./Project.module.css";

// routes
import { toApp } from "@routes/routes";

// components
import { Logo, Main } from "./index";
import { UpvtBtn } from "@components/index";

const Project = (props) => {
  const { slug, id, name, logo, category, canister, github, description, upvotedBy } = props;
  const openProject = (slug) => {
    toApp(slug);
  };

  return (
    <div className={css.project} onClick={() => openProject(slug)} key={id}>
      <Logo name={name} logo={logo} />
      <Main
        name={name}
        category={category}
        canister={canister}
        github={github}
        description={description}
      />

      <div className={css.upvote} onClick={(e) => e.stopPropagation()}>
        <UpvtBtn id={id} upvotedBy={upvotedBy} />
      </div>
    </div>
  );
};

export default Project;
