import React from "react"
import css from "./Meta.module.css"
import { Badge, Copy } from "./_index"

const Meta = () => {
  return (
    <div className={css.meta}>
      <Badge />
      <Copy />
    </div>
  )
}

export default Meta
