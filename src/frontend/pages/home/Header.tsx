import { Icon, LucideIconsKeys } from "@/components/ui/Icon"
import { useNav } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/curatedProjects"

type HeaderElement = {
  icon: LucideIconsKeys | ""
  text: string
}

const HEADER_ELEMENTS: HeaderElement[] = [
  {
    icon: "",
    text: "Latest Projects",
  },
  {
    icon: "TrendingUp",
    text: "DeFi",
  },
  {
    icon: "Gamepad2",
    text: "Gaming",
  },
  {
    icon: "Bot",
    text: "AI Agents",
  },
  {
    icon: "Globe",
    text: "Metaverse",
  },
  {
    icon: "Share2",
    text: "Social dApps",
  },
  {
    icon: "Dice3",
    text: "Betting",
  },
]

export default function Header() {
  const { toProjects } = useNav()
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <header className="flex flex-col items-center justify-center space-y-2 text-center">
      <h2 className="text-5xl leading-tight font-black">
        <span className="text-accent-1">Internet Computer</span> Ecosystem Playground
      </h2>
      <ul className="flex flex-wrap justify-center gap-2 text-sm text-neutral-500">
        {HEADER_ELEMENTS.map((el) => (
          <li key={el.text} className="flex items-center gap-1 rounded-full bg-neutral-900/50 px-3 py-1.5">
            {el.icon && <Icon lucideName={el.icon as LucideIconsKeys} size={16} />}
            <span>{el.text}</span>
          </li>
        ))}
      </ul>
      <p className="text-coolgray-500 text-2xl">
        Explore{" "}
        <span className="text-accent-1 hover:text-accent-2 cursor-pointer font-bold underline transition-all duration-300" onClick={toProjects}>
          {projectsNum > 0 ? projectsNum : "..."}
        </span>{" "}
        #ic projects
      </p>
    </header>
  )
}
