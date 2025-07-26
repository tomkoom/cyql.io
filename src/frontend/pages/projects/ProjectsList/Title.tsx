import { iCircleNodes, iGithub } from "@/components/icons/Icons"
import { UpvotesNum } from "@/components/ui"
import type { Project } from "@/state/types/Project"

interface TitleProps {
  project: Project
}

export default function Title({ project }: TitleProps) {
  const upvotesNum = project.upvotedBy.length

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <h4 className="text-coolgray-200 line-clamp-1 text-sm font-medium">{project.name}</h4>

        <ul className="flex items-center gap-2">
          {project.github && <li className="text-sky-700">{iGithub}</li>}
          {project.frontendCanisterId && <li className="text-indigo-700">{iCircleNodes}</li>}
        </ul>

        <UpvotesNum upvotesNum={upvotesNum} />
      </div>

      <p className="text-coolgray-500 -mt-0.5 line-clamp-1 text-sm font-normal">{project.description}</p>
    </div>
  )
}
