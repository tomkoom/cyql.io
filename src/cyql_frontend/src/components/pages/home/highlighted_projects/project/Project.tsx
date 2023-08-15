import React, { FC } from "react";
import styled from "styled-components";

// hooks
import useNav from "@/hooks/useNav";

// components
import { Logo, Main } from "./_index";
// import { UpvoteBtn } from "@/components/btns/index";

interface ProjectProps {
  slug: string;
  name: string;
  logo: string;
  categories: string[];
  canister: string;
  github: string;
  description: string;
}

const Project: FC<ProjectProps> = ({
  slug,
  name,
  logo,
  categories,
  canister,
  github,
  description /* upvotes */,
}): JSX.Element => {
  const { toProject } = useNav();

  const openProject = (slug: string): void => {
    toProject(slug);
  };

  return (
    <ProjectStyled onClick={() => openProject(slug)}>
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
    </ProjectStyled>
  );
};

const ProjectStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

// const Upvote = styled.div`
//   margin-left: auto;
// `;

export default Project;
