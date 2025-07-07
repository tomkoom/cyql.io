import { useNav } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/curatedProjects"

export default function Header() {
  const { toProjects } = useNav()
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <header className="flex flex-col items-center justify-center text-center">
      <h2 className="!text-5xl !font-black leading-tight">Internet Computer Ecosystem Playground</h2>
      <p className="text-xl text-coolgray-500 mt-4">
        Explore{" "}
        <span className="font-bold text-coolgray-200 cursor-pointer underline hover:text-white transition-all duration-300" onClick={toProjects}>
          {projectsNum > 0 ? projectsNum : "..."}
        </span>{" "}
        #ic projects
      </p>
    </header>
  )
}
