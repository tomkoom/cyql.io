import React, { FC } from "react"
import styled from "styled-components"
import type { Project } from "@/state/_types/types"

interface SocialsIcProps {
  project: Project
}

const SocialsIc: FC<SocialsIcProps> = ({ project }): JSX.Element => {
  return (
    <SocialsIcStyled>
      {project.dscvr && <li>Dscvr</li>}
      {project.distrikt && <li>Distrikt</li>}
      {project.openchat && <li>OpenChat</li>}
      {project.taggr && <li>#TAGGR</li>}
      {project.seers && <li>Seers</li>}
      {project.nuance && <li>Nuance</li>}
      {project.catalyze && <li>Catalyze</li>}
      {project.funded && <li>Funded</li>}
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
    padding: 0 0.33rem;
    background-color: var(--underlay1);
    border-radius: 0.5rem;
  }
`

export default SocialsIc
