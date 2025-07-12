import { iDiscord, iGithub, iMedium, iTelegram, iTwitter } from "@/components/icons/Icons"
import type { Project } from "@/state/types/curated_projects_types"
import React, { FC } from "react"
import styled from "styled-components"

interface SocialsProps {
  project: Project
}

const Socials: FC<SocialsProps> = ({ project }): JSX.Element => {
  return (
    <SocialsStyyled>
      {project.twitter && <li>{iTwitter}</li>}
      {project.discord && <li>{iDiscord}</li>}
      {project.telegram && <li>{iTelegram}</li>}
      {project.github && <li>{iGithub}</li>}
      {project.medium && <li>{iMedium}</li>}
    </SocialsStyyled>
  )
}

const SocialsStyyled = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  font-size: var(--fs6);
  color: var(--secondaryColor);

  > li {
    width: 1.5rem;
    height: 1.5rem;
    display: grid;
    place-items: center;
  }
`

export default Socials
