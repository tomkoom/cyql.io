import { FAIcon } from "@/components/FAIcon"
import type { Project } from "@/state/types/Project"

interface SocialsProps {
  project: Project
}

export const socialLinks = [
  { key: "twitter", icon: <FAIcon name="FaTwitter" /> },
  { key: "discord", icon: <FAIcon name="FaDiscord" /> },
  { key: "telegram", icon: <FAIcon name="FaTelegram" /> },
  { key: "github", icon: <FAIcon name="FaGithub" /> },
  { key: "medium", icon: <FAIcon name="FaMedium" /> },
] as const

export const icSocialLinks = [
  { key: "taggr", label: "#TAGGR" },
  { key: "openchat", label: "OpenChat" },
  { key: "dscvr", label: "DSCVR" },
  { key: "catalyze", label: "Catalyze" },
  { key: "funded", label: "Funded" },
  { key: "seers", label: "Seers" },
  { key: "nuance", label: "Nuance" },
  { key: "distrikt", label: "Distrikt" },
] as const

export default function SocialLinks({ project }: SocialsProps) {
  return (
    <ul className="text-coolgray-500 flex flex-wrap items-center gap-1 text-base">
      {socialLinks.map(
        ({ key, icon }) =>
          project[key as keyof Project] && (
            <li key={key} className="grid h-6 w-6 place-items-center">
              {icon}
            </li>
          )
      )}
      {icSocialLinks.map(
        ({ key, label }) =>
          project[key as keyof Project] && (
            <li key={key} className="text-coolgray-300 bg-coolgray-950 rounded-sm px-1 py-0.5 text-xs">
              {label}
            </li>
          )
      )}
    </ul>
  )
}
