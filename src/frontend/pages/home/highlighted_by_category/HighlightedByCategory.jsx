import React from "react"
import css from "./HighlightedByCategory.module.css"
import { iCheckCircle } from "@/components/icons/Icons"
import { useNav } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveCuratedProjects } from "@/state/curatedProjects"

// components
// import { UpvoteBtn } from "@/components/btns/index";
import { Logo } from "./_index"

const HighlightedByCategory = ({ filter }) => {
  const { toProject } = useNav()
  const projects = useAppSelector(selectActiveCuratedProjects).filter(
    (projectDoc) => projectDoc.data.archived !== true
  )

  const sortByUpvotes = (a, b) => {
    const aUpvotes = a.data.upvotes
    const bUpvotes = b.data.upvotes
    if (aUpvotes && bUpvotes) {
      return bUpvotes.length - aUpvotes.length
    } else if (!aUpvotes && bUpvotes) {
      return 1
    } else if (aUpvotes && !bUpvotes) {
      return -1
    }
    return 0
  }

  const sortByVerified = (a, b) => {
    return a.data.verified === b.data.verified ? 0 : a.data.verified ? -1 : 1
  }

  const formatDescription = (d) => {
    return d.length > 60 ? `${d.substring(0, 60)}…` : d
  }

  const openProject = (id) => {
    toProject(id)
  }

  return (
    <ul className={css.projects}>
      {projects
        .filter((project) => project.data.categories.includes(filter))
        .sort((a, b) => sortByUpvotes(a, b))
        .sort((a, b) => sortByVerified(a, b))
        .slice(0, 16)
        .map((project) => (
          <li
            className={css.project}
            onClick={() => openProject(project.data.id)}
            key={project.key}
          >
            <div className={css.main}>
              <Logo logo={project.data.logo} name={project.data.name} />
              <div>
                <div className={css.titleContainer}>
                  {project.data.verified && <span className={css.icon}>{iCheckCircle}</span>}
                  <h4 className={css.title}>{project.data.name}</h4>
                </div>

                <p className={css.description}>
                  {project.data.description && formatDescription(project.data.description)}
                </p>
              </div>
            </div>

            {/* upvote button */}
            {/* <div className={css.upvoteBtn} onClick={(e) => e.stopPropagation()}>
              <UpvoteBtn id={project.key} upvotes={project.data.upvotes} />
            </div> */}
          </li>
        ))}
    </ul>
  )
}

export default HighlightedByCategory
