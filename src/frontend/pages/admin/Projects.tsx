import React, { FC, ChangeEvent } from "react"
import styled, { css } from "styled-components"
import { ProjectData } from "@/state/_types/types"

// formatters
import { formatStr16, formatWebsite, formatDiscord } from "@/utils/format"
import { twitterUsername } from "@/utils/twitterUsername"

// components
import { Search } from "@/components/ui/_index"
import { ProjectModal } from "@/modals/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAllProjects } from "@/state/projects"
import {
  setProjectModalIsOpen,
  setProject,
  setProjectModalMode,
  selectProjectModalIsOpen,
} from "@/state/modals/projectModal"
import { setAdminSearch, selectAdminSearch } from "@/state/admin/adminSearch"

const Projects: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(selectAllProjects)
  const searchQuery = useAppSelector(selectAdminSearch)
  const isOpen = useAppSelector(selectProjectModalIsOpen)

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearch(e.target.value))
  }

  const editProject = (project: ProjectData) => {
    dispatch(setProject(project))
    dispatch(setProjectModalMode("edit"))
    dispatch(setProjectModalIsOpen(true))
  }

  return (
    <div>
      <ProjectModal isOpen={isOpen} />
      <Search placeholder={"search by project name"} value={searchQuery} onChange={setSearch} />

      <Table>
        <RowHeader>
          <span>#</span>
          <span>id</span>
          <span>name</span>
          <span>archived</span>
          <span>category</span>
          <span>logo</span>
          <span>twitter</span>
          <span>discord</span>
        </RowHeader>

        {projects
          .filter((project: ProjectData) => {
            if (searchQuery === "") {
              return project
            } else if (project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return project
            }
          })
          .map((project: ProjectData, i: number) => (
            <Row key={project.id} onClick={() => editProject(project)}>
              <span>{projects.length - i}</span>
              <span>{project.id}</span>
              <span>{project.name && formatStr16(project.name)}</span>
              <span>{project.archived.toString()}</span>
              <span>{project.category.join(", ").toLowerCase()}</span>
              <span>{project.logo && formatWebsite(project.logo)}</span>
              <span>{project.twitter && twitterUsername(project.twitter)}</span>
              <span>{project.discord && formatDiscord(project.discord)}</span>
            </Row>
          ))}
      </Table>
    </div>
  )
}

const Table = styled.div`
  margin-top: 1rem;
  width: 100%;
  font-size: var(--fs6);
`

const row = css`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  gap: 1rem;
`

const RowHeader = styled.div`
  ${row}
  font-weight: var(--fwBold);

  > span {
    flex: 1;
    font-family: var(--monospace);
  }
`

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
    font-family: var(--monospace);
  }
`

export default Projects
