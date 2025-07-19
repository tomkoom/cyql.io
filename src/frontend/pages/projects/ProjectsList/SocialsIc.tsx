import type { Project } from "@/state/types/Project"

interface SocialsIcProps {
  project: Project
}

const socialPlatforms = [
  { key: "taggr", label: "#TAGGR" },
  { key: "openchat", label: "OpenChat" },
  { key: "dscvr", label: "DSCVR" },
  { key: "catalyze", label: "Catalyze" },
  { key: "funded", label: "Funded" },
  { key: "seers", label: "Seers" },
  { key: "nuance", label: "Nuance" },
  { key: "distrikt", label: "Distrikt" },
] as const

export default function SocialsIc({ project }: SocialsIcProps) {
  return (
    <ul className="flex flex-wrap items-center gap-2 text-xs">
      {socialPlatforms.map(
        ({ key, label }) =>
          project[key as keyof Project] && (
            <li key={key} className="bg-coolgray-950 text-coolgray-300 flex h-6 items-center rounded-sm px-2">
              {label}
            </li>
          )
      )}
    </ul>
  )
}
