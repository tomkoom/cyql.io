import { Loading } from "@/components/ui"
import type { Project as ProjectType } from "@/state/_types/curated_projects_types"
import { device } from "@/styles/breakpoints"
import styled from "styled-components"
import { Project } from "."

interface HighlightedProjectsProps {
  projects: ProjectType[]
}

export default function HighlightedProjects({ projects }: HighlightedProjectsProps) {
  if (!projects || projects.length === 0) {
    return <Loading />
  }

  return (
    <HighlightedProjectsStyled>
      <div className="grid">
        {projects.slice(0, 24).map((p) => (
          <Project key={p.id.toString()} project={p} />
        ))}
      </div>
    </HighlightedProjectsStyled>
  )
}

const HighlightedProjectsStyled = styled.div`
  > div.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1rem;

    @media ${device.mobileL} {
      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    }
  }
`
