import { useAuth } from "@/context/Auth"
import { sortProjectsByDate } from "@/utils/sortProjectsByDate"
import type { ProjectData } from "../../declarations/backend/backend.did"
import { verifyAdmin } from "@/utils/verifyAdmin"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import {
  setActiveProjects,
  setActiveProjectsNum,
  setAllProjects,
  setAllProjectsNum,
  setProjectsLoading,
} from "@/state/projects"

const useBackend = () => {
  const dispatch = useAppDispatch()
  const { actor, userId } = useAuth()

  const refreshProjects = async (): Promise<void> => {
    if (actor) {
      dispatch(setProjectsLoading(true))
      const allProjects: ProjectData[] = await actor.listCuratedProjects()
      allProjects.sort((a, b) => sortProjectsByDate(a.createdAt, b.createdAt))
      const aciveProjects: ProjectData[] = allProjects.filter((p) => !p.archived)
      dispatch(setAllProjects(allProjects))
      dispatch(setActiveProjects(aciveProjects))
      dispatch(setAllProjectsNum(allProjects.length))
      dispatch(setActiveProjectsNum(aciveProjects.length))
      dispatch(setProjectsLoading(false))
    }
  }

  const addProject = async (project: ProjectData): Promise<boolean> => {
    let result = false
    if (actor) {
      if (verifyAdmin(userId)) {
        await actor.addCuratedProject(project).then(() => {
          result = true
        })
      }
    }
    return result
  }

  const deleteProject = (): void => {}

  return { refreshProjects, addProject }
}

export default useBackend
