import { LogoLetter } from "@/components/ui"
import { Project } from "@/state/types/Project"
import { getLogoUrl } from "@/utils/utils"

interface LogoProps {
  project: Project
  size?: string
  borderRadius?: string
}

export default function Logo({ project, size = "4rem", borderRadius = "2rem" }: LogoProps) {
  const logoUrl = getLogoUrl(project)
  const style = {
    width: size,
    height: size,
  }

  return logoUrl ? (
    <img className="flex-shrink-0 rounded-2xl object-cover" style={style} src={logoUrl} alt={`${project.name} logo`} />
  ) : (
    <LogoLetter size={size} borderRadius={borderRadius} name={project.name} />
  )
}
