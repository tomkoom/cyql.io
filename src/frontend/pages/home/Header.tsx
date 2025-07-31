import { Icon, LucideIconsKeys } from "@/components/Icon"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/hooks"
import { useFormattedProjectsCount } from "@/hooks/queries/useProjectsStats"

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
  const { toProjects, toListProject } = useNavigation()
  const { formattedCount } = useFormattedProjectsCount()

  return (
    <header className="flex flex-col items-center justify-center space-y-3 px-4 text-center">
      <h1 className="text-2xl leading-tight font-black sm:text-3xl md:text-4xl lg:text-5xl">
        <span className="text-accent-1">Internet Computer</span> Ecosystem Playground
      </h1>
      <p className="text-coolgray-500 max-w-xs text-sm leading-relaxed sm:max-w-lg sm:text-base md:max-w-2xl lg:max-w-3xl">
        Explore cutting-edge Web3 projects built on the Internet Computer—gaming, AI agents, metaverse, social dApps, betting, DeFi, and beyond. Keep up with
        the next big thing in decentralized tech.
      </p>
      <ul className="text-coolgray-500 flex max-w-4xl flex-wrap justify-center gap-2 text-xs sm:text-sm">
        {HEADER_ELEMENTS.map((el) => (
          <li key={el.text} className="bg-coolgray-950/80 flex items-center gap-1 rounded-full px-2 py-1 sm:px-3 sm:py-1.5">
            {el.icon && <Icon lucideName={el.icon as LucideIconsKeys} size={14} className="sm:h-4 sm:w-4" />}
            <span>{el.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Button variant="accentOutline" size="lg" className="h-10 px-3 text-base font-bold sm:h-12 sm:px-4 sm:text-lg" onClick={toProjects}>
          Explore {formattedCount} projects
        </Button>
        {/* <Button variant="outline" size="lg" className="text-coolgray-400 px-4 text-lg font-bold" onClick={toListProject}>
          List a project
        </Button> */}
      </div>
    </header>
  )
}
