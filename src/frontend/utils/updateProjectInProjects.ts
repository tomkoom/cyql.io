import store from "@/state/_store"
import { HighlightedItem } from "@/state/home/home"
import { Project } from "@/state/types/Project"

const { dispatch } = store

export const updateInProjects = (project: Project, projects: Project[], setProjects: any) => {
  if (projects.length > 0) {
    const copy = projects.slice()
    const idx = copy.findIndex((p) => p.id === project.id)

    if (idx !== -1) {
      copy[idx] = project
      dispatch(setProjects(copy))
    }
  }
}

export const updateInHighlighted = (project: Project, highlighted: HighlightedItem, setHomeHighlighted: any) => {
  const keys = Object.keys(highlighted)

  keys.forEach((key) => {
    const projects = highlighted[key]
    const copy = projects.slice()
    const idx = copy.findIndex((p) => p.id === project.id)

    if (idx !== -1) {
      copy[idx] = project
      dispatch(setHomeHighlighted({ key: copy }))
    }
  })
}
