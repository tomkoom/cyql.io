import type { Project } from "@/state/types/Project"
import { Logo, Title } from "."

interface MainProps {
  project: Project
}

export default function Main({ project }: MainProps) {
  return (
    <div className="flex items-center gap-4">
      <Logo project={project} />
      <Title project={project} />
    </div>
  )
}
