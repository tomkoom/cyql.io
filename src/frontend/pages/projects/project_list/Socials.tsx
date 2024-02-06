import React, { FC } from "react"
import styled from "styled-components"
import { iTwitter, iDiscord, iTelegram, iGithub, iMedium } from "@/components/icons/Icons"
import { Project } from "@/state/_types/types"

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

const SocialsStyyled = styled.div`
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
