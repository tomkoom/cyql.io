import { LogoLetter } from "@/components/ui"
import { Project } from "@/state/types/Project"
import { getLogoUrl } from "@/utils/utils"
import React, { FC } from "react"
import styled from "styled-components"

interface LogoProps {
  project: Project
}

const Logo: FC<LogoProps> = ({ project }): JSX.Element => {
  const size = "4.25rem"
  const borderRadius = "2.125rem"
  const logoUrl = getLogoUrl(project)

  if (logoUrl) {
    return <LogoStyled size={size} borderRadius={borderRadius} src={logoUrl} alt={`${project.name} logo`} />
  }

  return <LogoLetter size={size} borderRadius={borderRadius} name={project.name} />
}

const LogoStyled = styled.img<{ size: string; borderRadius: string }>`
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  border-radius: ${(p) => p.borderRadius};
  flex-shrink: 0;
  object-fit: cover;
`

export default Logo
