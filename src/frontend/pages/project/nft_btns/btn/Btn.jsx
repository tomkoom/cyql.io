import { iExternalLink } from "@/components/icons/Icons"
import { addSourceParam } from "@/utils/utils"
import css from "./Btn.module.css"

export default function Btn({ label, url }) {
  return (
    <a className={css.btn} href={addSourceParam(url)} target="_blank" rel="norefferrer noopener">
      {label}
      <span className={css.icon}>{iExternalLink}</span>
    </a>
  )
}
