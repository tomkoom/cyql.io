import type { Project } from "@/state/types/curated_projects_types"
import React, { FC } from "react"
import styled from "styled-components"

interface SocialsIcProps {
  project: Project
}

const SocialsIc: FC<SocialsIcProps> = ({ project }): JSX.Element => {
  return (
    <SocialsIcStyled>
      {project.taggr && <li>#TAGGR</li>}
      {project.openchat && <li>OpenChat</li>}
      {project.dscvr && <li>DSCVR</li>}
      {project.catalyze && <li>Catalyze</li>}
      {project.funded && <li>Funded</li>}
      {project.seers && <li>Seers</li>}
      {project.nuance && <li>Nuance</li>}

      {/* ... */}
      {project.distrikt && <li>Distrikt</li>}
    </SocialsIcStyled>
  )
}

const SocialsIcStyled = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: var(--fs7);

  > li {
    height: 1.5rem;
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    background-color: var(--underlay1);
  }
`

export default SocialsIc
