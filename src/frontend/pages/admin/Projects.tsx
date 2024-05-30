import React, { FC } from "react"
import styled, { css } from "styled-components"
import type { Project } from "@/state/_types/curated_projects_types"
import { AdminModal } from "@/modals/_index"
import { twitterUsername, formatStr16, formatWebsite, formatDiscord } from "@/utils/_index"
import { Loading } from "@/components/ui/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAdmin, setAdminProject, setAdminMode, setAdminIsModalOpen } from "@/state/admin/admin"

const Projects: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { allProjects, searchQ, isModalOpen } = useAppSelector(selectAdmin)

  const editProject = (project: Project): void => {
    dispatch(setAdminProject(project))
    dispatch(setAdminMode("edit"))
    dispatch(setAdminIsModalOpen(true))
  }

  if (allProjects.length < 1) {
    return <Loading />
  }

  return (
    <div>
      <AdminModal isOpen={isModalOpen} />

      <Table>
        <RowHeader>
          <span className="num">#</span>
          <span>id</span>
          <span>name</span>
          <span>archived</span>
          <span>category</span>
          <span>logoUrl</span>
          <span>twitter</span>
          <span>discord</span>
        </RowHeader>

        {allProjects
          .filter((project: Project) => {
            if (searchQ === "") {
              return project
            } else if (project.name.toLowerCase().includes(searchQ.toLowerCase())) {
              return project
            }
          })
          .map((project: Project, i: number) => (
            <Row key={project.id} onClick={() => editProject(project)}>
              <span className="num">{allProjects.length - i}</span>
              <span>{project.id}</span>
              <span>{project.name && formatStr16(project.name)}</span>
              <span>{project.archived.toString()}</span>
              <span>{project.category.join(", ").toLowerCase()}</span>
              <span>{project.logoUrl && formatWebsite(project.logoUrl)}</span>
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

  > span.num {
    width: 2rem;
  }

  > span:not(.num) {
    flex: 1;
    font-size: var(--fsText);
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

  > span.num {
    width: 2rem;
  }

  > span:not(.num) {
    flex: 1;
    font-size: var(--fsText);
  }
`

export default Projects
