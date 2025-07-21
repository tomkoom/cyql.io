import { iCircleNodes, iGithub } from "@/components/icons/Icons"
import { Icon } from "@/components/ui/Icon"
import { useNav } from "@/hooks"
import type { Project as ProjectType } from "@/state/types/Project"
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
      className="group bg-coolgray-950/50 hover:bg-coolgray-950 flex cursor-pointer flex-col gap-3 rounded-3xl p-4 transition-colors"
      onClick={() => toProject(project.id)}
    >
      <div className="flex items-start gap-3">
        <Logo project={project} />
        <div className="w-full">
          <div className="flex items-baseline justify-between gap-1">
            <h4 className="group-hover:text-accent-3 line-clamp-1 font-bold text-wrap transition-colors">{name}</h4>
            {upvotesNum > 0 && (
              <p className="flex items-center gap-1 rounded-sm bg-emerald-500/10 px-1 py-0.5 text-xs font-bold text-emerald-500 tabular-nums">
                <Icon lucideName="ArrowUp" size={14} strokeWidth={2} /> {upvotesNum}
              </p>
            )}
          </div>
          <p className="text-coolgray-500 line-clamp-2 text-sm font-light">{description}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-1">
          <ul className="flex flex-wrap items-center gap-1">
            {category.map((category) => (
              <li key={category} className="bg-coolgray-900/60 text-coolgray-300 flex h-[22px] items-center rounded-sm px-1 !font-mono text-xs">
                {category}
              </li>
            ))}
          </ul>

          {(frontendCanisterId || github) && (
            <ul className="flex flex-wrap items-center gap-1">
              {frontendCanisterId && (
                <li className="text-coolgray-300 bg-coolgray-900/60 text-coolgray-300 flex h-[22px] items-center gap-1 rounded-sm px-1 !font-mono text-xs">
                  <span className="text-sm text-green-700">{iCircleNodes}</span> Onchain
                </li>
              )}
              {github && (
                <li className="text-coolgray-300 bg-coolgray-900/60 text-coolgray-300 flex h-[22px] items-center gap-1 rounded-sm px-1 !font-mono text-xs">
                  <span className="text-sm text-blue-700">{iGithub}</span> Open
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
