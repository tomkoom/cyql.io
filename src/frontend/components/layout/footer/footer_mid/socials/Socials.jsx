import React from "react"
import css from "./Socials.module.css"

// constants
import { X_URL, DISCORD_URL } from "@/constants/constants"

// icons
import { iX, iDiscord } from "@/components/icons/Icons"

const Socials = () => {
  const socials = [
    { id: "twitter", link: X_URL, icon: iX },
    { id: "discord", link: DISCORD_URL, icon: iDiscord },
  ]

  return (
    <ul className={css.socials}>
      {socials.map((s) => (
        <li className={css.socialsI} key={s.id}>
          <a href={s.link} id={s.id} rel="noreferrer noopener" target="_blank">
            {s.icon}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Socials
