import React from "react";
import css from "./Project.module.css";

// routes
import { toApp } from "@routes/routes";

// components
import { Logo, Main } from "./index";
// import { UpvoteBtn } from "@btns/index";

const Project = (props) => {
  const { slug, id, name, logo, categories, canister, github, description, upvotes } = props;
  const openProject = (slug) => {
    toApp(slug);
  };

  return (
    <div className={css.project} onClick={() => openProject(slug)} key={id}>
      <Logo name={name} logo={logo} />
      <Main
        name={name}
        categories={categories}
        canister={canister}
        github={github}
        description={description}
      />

      {/* <div className={css.upvote} onClick={(e) => e.stopPropagation()}>
        <UpvoteBtn id={id} upvotes={upvotes} />
      </div> */}
    </div>
  );
};

export default Project;
