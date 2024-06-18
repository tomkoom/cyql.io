import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useQueryParams, useProjects, useNav } from "@/hooks/_index"
import { filterBySearch } from "./utils/filterProjects"
import { useAuth } from "@/context/Auth"

// components
import { UpvoteBtn } from "@/components/btns/_index"
import { Main, Socials, SocialsIc, Tags } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectPaginated } from "@/state/projects/paginated"

const ProjectList: FC = (): JSX.Element => {
  const { actor } = useAuth()
  const { toProject } = useNav()
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const paginated = useAppSelector(selectPaginated)
  const projects = paginated.data

  useEffect(() => {
    if (actor) {
      if (projects.length < 1 && queryParams.q === "") {
        refreshPaginated(queryParams)
      }
    }
  }, [actor, projects])

  if (projects.length < 1) {
    return null
  }

  return (
    <ProjectListStyled>
      <ul>
        {projects
          // search
          .filter((project) => filterBySearch(project, queryParams.q))
          .map((p) => {
            return (
              <li key={p.id} onClick={() => toProject(p.id.toString())}>
                <div className="main1">
                  <Main project={p} />
                </div>

                <div className="tags">
                  <Tags category={p.category} />
                </div>

                <div className="socials">
                  <Socials project={p} />
                </div>

                <div className="socials">
                  <SocialsIc project={p} />
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  <UpvoteBtn projectId={p.id.toString()} btnLocation={"project_list"} upvotedBy={p.upvotedBy} />
                </div>
              </li>
            )
          })}
      </ul>
    </ProjectListStyled>
  )
}

const ProjectListStyled = styled.div`
  > ul {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    > li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.5rem 0;
      box-shadow: 0px 1px 0px 0px var(--underlay1);
      cursor: pointer;
      transition: var(--transition1);

      &:hover {
        background-color: var(--underlay1);
      }

      > div.main1 {
        flex: 50%;

        @media ${device.tablet} {
          flex: calc(70% - 1rem);
        }

        @media ${device.mobileL} {
          flex: unset;
        }
      }

      > div.tags {
        flex: 20%;

        @media ${device.tablet} {
          flex: calc(30% - 1rem);
        }

        @media ${device.mobileL} {
          display: none;
        }
      }

      > div.socials {
        flex: 15%; // x2

        @media ${device.tablet} {
          display: none;
        }
      }
    }
  }
`

export default ProjectList
