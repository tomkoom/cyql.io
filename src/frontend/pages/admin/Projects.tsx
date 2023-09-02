import React, { FC, ChangeEvent } from "react";
import styled, { css } from "styled-components";

// formatters
import { formatStr12, formatStr16, formatWebsite, formatDiscord } from "@/utils/format";
import { twitterUsername } from "@/utils/twitterUsername";

// components
import { Search } from "@/components/ui/_index";
import { ProjectModal } from "@/components/modals/_index";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectProjects } from "@/state/projects";
import {
  setProjectModal,
  selectProjectModal,
  setProjectDoc,
} from "@/state/modals/projectModal/projectModal";
import { setAdminSearch, selectAdminSearch } from "@/state/admin/adminSearch";

const Projects: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const searchQuery = useAppSelector(selectAdminSearch);
  const isOpen = useAppSelector(selectProjectModal);

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearch(e.target.value));
  };

  const editProject = (project: any) => {
    dispatch(setProjectDoc(project));
    dispatch(setProjectModal(true));
  };

  return (
    <div>
      <ProjectModal isOpen={isOpen} />

      <Search placeholder={"search by project name"} value={searchQuery} onChange={setSearch} />

      <Table>
        <RowHeader>
          <span>#</span>
          <span>id</span>
          <span>name</span>
          <span>slug</span>
          <span>archived</span>
          <span>category</span>
          <span>logo</span>
          <span>twitter</span>
          <span>discord</span>
        </RowHeader>

        {projects
          .filter((project: any) => {
            if (searchQuery === "") {
              return project;
            } else if (project.data.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return project;
            }
          })
          .map((project: any, i: number) => (
            <Row key={project.key} onClick={() => editProject(project)}>
              <span>{projects.length - i}</span>
              <span>{project.key}</span>
              <span>{project.data.name && formatStr16(project.data.name)}</span>
              <span>{project.data.slug && formatStr12(project.data.slug)}</span>
              <span>{project.data.archived.toString()}</span>
              <span>{project.data.categories.join(", ").toLowerCase()}</span>
              <span>{project.data.logo && formatWebsite(project.data.logo)}</span>
              <span>{project.data.twitter && twitterUsername(project.data.twitter)}</span>
              <span>{project.data.discord && formatDiscord(project.data.discord)}</span>
            </Row>
          ))}
      </Table>
    </div>
  );
};

const Table = styled.div`
  margin-top: 1rem;
  width: 100%;
  font-size: var(--fsText);
`;

const row = css`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  gap: 1rem;
`;

const RowHeader = styled.div`
  ${row}
  font-weight: var(--fwBold);

  > span {
    flex: 1;
  }
`;

const Row = styled.div`
  ${row}
  cursor: pointer;

  &:nth-child(even) {
    background-color: var(--underlay1);
  }

  &:hover {
    background-color: var(--underlay2);
  }

  > span {
    flex: 1;
  }
`;

export default Projects;
