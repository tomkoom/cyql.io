import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useNav } from "@/hooks/_index"
import { useQueryParams, useProjects } from "@/hooks/_index"
import { filterBySearch } from "./utils/filterProjects"

// components
import { UpvoteBtn } from "@/components/btns/_index"
import { Main, Socials, SocialsIc, Tags } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectPaginated } from "@/state/projects/paginated"

const ProjectList: FC = (): JSX.Element => {
  const { toProject } = useNav()
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const paginated = useAppSelector(selectPaginated)
  const projects = paginated.data

  useEffect(() => {
    if (projects.length < 1) {
      refreshPaginated(queryParams)
    }
  }, [projects])

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

                <div className="upvote">
                  <div className="btn" onClick={(e) => e.stopPropagation()}>
                    <UpvoteBtn projectId={p.id.toString()} btnLocation={"project_list"} upvotedBy={p.upvotedBy} />
                  </div>
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

      @media ${device.tablet} {
        flex-direction: column;
        align-items: center;
      }

      > div.main1 {
        flex: 40%;

        @media ${device.tablet} {
          flex: calc(60% - 1rem);
        }

        @media ${device.mobileL} {
          flex: 100%;
        }
      }

      > div.tags {
        flex: 20%;

        @media ${device.tablet} {
          flex: calc(30% - 1rem);
        }

        @media ${device.mobileL} {
          flex: calc(80% - 0.5rem);
        }
      }

      > div.socials {
        flex: 15%;

        @media ${device.tablet} {
          display: none;
        }
      }

      > div.upvote {
        flex: 10%;
        display: inline-block;

        > div.btn {
          float: right;
          margin-right: 1px;
        }

        @media ${device.tablet} {
          flex: calc(10% - 1rem);
        }

        @media ${device.mobileL} {
          flex: calc(20% - 0.5rem);
        }
      }
    }
  }
`

export default ProjectList
