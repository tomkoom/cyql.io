import { useNav } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/curatedProjects"

export default function Header() {
  const { toProjects } = useNav()
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <header className="flex flex-col items-center justify-center text-center">
      <h2 className="text-5xl leading-tight font-black">
        <span className="text-accent-1">Internet Computer</span> Ecosystem Playground
      </h2>
      <p className="text-coolgray-500 mt-2 text-2xl">
        Explore{" "}
        <span className="text-accent-1 hover:text-accent-2 cursor-pointer font-bold underline transition-all duration-300" onClick={toProjects}>
          {projectsNum > 0 ? projectsNum : "..."}
        </span>{" "}
        #ic projects
      </p>
    </header>
  )
}
