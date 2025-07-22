import { ProjectLogoLetter } from "@/components/ui"
import { Project } from "@/state/types/Project"
import { getLogoUrl } from "@/utils/utils"
import { FC } from "react"
import styled from "styled-components"

interface LogoProps {
  project: Project
}

const Logo: FC<LogoProps> = ({ project }) => {
  const size = "6rem"
  const borderRadius = "3rem"
  const logoUrl = getLogoUrl(project)

  return (
    <div>
      {logoUrl ? (
        <LogoStyled size={size} borderRadius={borderRadius} src={logoUrl} alt={`${project.name} logo`} />
      ) : (
        <ProjectLogoLetter size={size} borderRadius={borderRadius} name={project.name} />
      )}
    </div>
  )
}

const LogoStyled = styled.img<{ size: string; borderRadius: string }>`
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  border-radius: ${(p) => p.borderRadius};
  flex-shrink: 0;
  object-fit: cover;
`

export default Logo
