import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useNav } from "@/hooks/_index"
import type { Project as P } from "@/state/_types/curated_projects_types"

// components
import { Loading } from "@/components/ui/_index"
import { ViewMoreBtn } from "@/components/btns/_index"
import { Project } from "./_index"

interface HighlightedProjectsProps {
  projects: P[]
}

const HighlightedProjects: FC<HighlightedProjectsProps> = ({ projects }): JSX.Element => {
  const { toProjects } = useNav()

  if (!projects) {
    return <Loading />
  }

  return (
    <HighlightedProjectsStyled>
      <div className="grid">
        {projects.slice(0, 24).map((p) => (
          <Project key={p.id.toString()} project={p} />
        ))}
      </div>

      {projects.length > 0 && <ViewMoreBtn text="View All Projects" nav={toProjects} />}
    </HighlightedProjectsStyled>
  )
}

const HighlightedProjectsStyled = styled.div`
  > div.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1.5rem;

    @media ${device.mobileL} {
      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    }
  }
`

export default HighlightedProjects
