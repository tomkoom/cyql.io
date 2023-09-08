import { ProjectData } from "../../declarations/backend/backend.did"

// utils
import { sortProjectsByDate } from "@/utils/sortProjectsByDate"

// auth
import { useAuth } from "@/context/Auth"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import {
  setProjectsLoading,
  setAllProjects,
  setActiveProjects,
  setAllProjectsNum,
  setActiveProjectsNum,
} from "@/state/projects"

const useBackend = () => {
  const dispatch = useAppDispatch()
  const { actor } = useAuth()

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

  return { refreshProjects }
}

export default useBackend
