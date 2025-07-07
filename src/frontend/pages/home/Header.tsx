import { useNav } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/curatedProjects"

export default function Header() {
  const { toProjects } = useNav()
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <header className="flex flex-col items-center justify-center text-center">
      <h2 className="!text-5xl !font-black leading-tight">
        <span className="text-accent-1">Internet Computer</span> Ecosystem Playground
      </h2>
      <p className="text-xl text-coolgray-500 mt-4">
        Explore{" "}
        <span className="font-bold text-accent-1 cursor-pointer underline hover:text-accent-2 transition-all duration-300" onClick={toProjects}>
          {projectsNum > 0 ? projectsNum : "..."}
        </span>{" "}
        #ic projects
      </p>
    </header>
  )
}
