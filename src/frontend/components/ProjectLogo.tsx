import { Project } from "@/state/types/Project"
import { getLogoUrl } from "@/utils/utils"
import { ProjectLogoLetter } from "./ui"

interface ProjectLogoProps {
  project: Project
  sizeRem?: string
  borderRadiusRem?: string
}

export default function ProjectLogo({ project, sizeRem = "4rem", borderRadiusRem = "2rem" }: ProjectLogoProps) {
  const logoUrl = getLogoUrl(project)

  return logoUrl ? (
    <img className="flex-shrink-0 rounded-2xl object-cover" style={{ width: sizeRem, height: sizeRem }} src={logoUrl} alt={`${project.name} logo`} />
  ) : (
    <ProjectLogoLetter size={sizeRem} borderRadius={borderRadiusRem} name={project.name} />
  )
}
