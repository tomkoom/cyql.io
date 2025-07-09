import { iCircleNodes, iGithub } from "@/components/icons/Icons"
import { UpvotesNum } from "@/components/ui"
import { useNav } from "@/hooks"
import type { Project as ProjectType } from "@/state/_types/curated_projects_types"
import { trimName } from "@/utils/index"
import { Logo } from "."

interface ProjectProps {
  project: ProjectType
}

export default function Project({ project }: ProjectProps) {
  const { toProject } = useNav()
  const { name, upvotedBy, category, frontendCanisterId, github, description } = project
  const upvotesNum = upvotedBy.length

  return (
    <div
      className="group bg-coolgray-950/50 hover:bg-coolgray-950/80 flex cursor-pointer flex-col gap-3 rounded-3xl p-4 transition-colors"
      onClick={() => toProject(project.id)}
    >
      <div className="flex items-start gap-3">
        <Logo name={project.name} logo={project.logoDataUrl} />
        <div className="w-full">
          <div className="flex items-baseline justify-between gap-1">
            <h4 className="group-hover:text-accent-3 font-bold text-wrap transition-colors">{trimName(name)}</h4> <UpvotesNum upvotesNum={upvotesNum} />
          </div>
          <p className="text-coolgray-500 line-clamp-2 text-sm font-light">{description}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-1">
          <ul className="flex flex-wrap items-center gap-1">
            {category.map((category) => (
              <li key={category} className="bg-coolgray-900 text-coolgray-300 rounded-sm px-1 py-0.5 !font-mono text-xs">
                {category}
              </li>
            ))}
          </ul>

          {(frontendCanisterId || github) && (
            <ul className="flex flex-wrap items-center gap-1">
              {frontendCanisterId && <li className="text-coolgray-300 text-sm">{iCircleNodes} onchain</li>}
              {github && <li className="text-coolgray-300 text-sm">{iGithub} open</li>}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
