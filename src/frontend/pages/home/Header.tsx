import { Icon, LucideIconsKeys } from "@/components/Icon"
import { useNav } from "@/hooks"
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
  const { toProjects } = useNav()
  const { formattedCount } = useFormattedProjectsCount()

  return (
    <header className="flex flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-5xl leading-tight font-black">
        <span className="text-accent-1">Internet Computer</span> Ecosystem Playground
      </h1>
      <p className="text-coolgray-500 max-w-3xl">
        Explore cutting-edge Web3 projects built on the Internet Computer—gaming, AI agents, metaverse, social dApps, betting, DeFi, and beyond. Keep up with
        the next big thing in decentralized tech.
      </p>
      <ul className="text-coolgray-500 flex flex-wrap justify-center gap-2 text-sm">
        {HEADER_ELEMENTS.map((el) => (
          <li key={el.text} className="bg-coolgray-950/80 flex items-center gap-1 rounded-full px-3 py-1.5">
            {el.icon && <Icon lucideName={el.icon as LucideIconsKeys} size={16} />}
            <span>{el.text}</span>
          </li>
        ))}
      </ul>
      <p className="text-coolgray-500 text-xl">
        Explore{" "}
        <span className="text-accent-3 hover:text-accent-1 cursor-pointer font-bold underline transition-all duration-300" onClick={toProjects}>
          {formattedCount}
        </span>{" "}
        #ic projects
      </p>
    </header>
  )
}
