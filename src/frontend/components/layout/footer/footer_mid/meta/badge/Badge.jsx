import React from "react"
import css from "./Badge.module.css"
import logo from "@/assets/ic-logo.svg"

const Badge = () => {
  return (
    <div className={css.badge}>
      <p className={css.text}>Powered by</p>
      <a
        className={css.link}
        href="https://internetcomputer.org/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img className={css.logo} src={logo} alt="Internet Computer logo" />
        Internet Computer
      </a>
    </div>
  )
}

export default Badge
