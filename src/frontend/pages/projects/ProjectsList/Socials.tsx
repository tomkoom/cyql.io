import { iDiscord, iGithub, iMedium, iTelegram, iTwitter } from "@/components/icons/Icons"
import type { Project } from "@/state/types/Project"

interface SocialsProps {
  project: Project
}

const socialPlatforms = [
  { key: "twitter", icon: iTwitter },
  { key: "discord", icon: iDiscord },
  { key: "telegram", icon: iTelegram },
  { key: "github", icon: iGithub },
  { key: "medium", icon: iMedium },
] as const

export default function Socials({ project }: SocialsProps) {
  return (
    <ul className="text-coolgray-500 flex flex-wrap items-center gap-1 text-base">
      {socialPlatforms.map(
        ({ key, icon }) =>
          project[key as keyof Project] && (
            <li key={key} className="grid h-6 w-6 place-items-center">
              {icon}
            </li>
          )
      )}
    </ul>
  )
}
