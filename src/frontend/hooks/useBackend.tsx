import { useAuth } from "@/context/Auth"
import { sortProjectsByDate } from "@/utils/sortProjectsByDate"
import type { ProjectData } from "@/state/_types/types"
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
    if (!actor) return

    dispatch(setProjectsLoading(true))
    const allProjects: ProjectData[] = await actor
      .listProjects()
      .then((p) => p.map((p) => ({ ...p, id: Number(p.id).toString() })))

    allProjects.sort((a, b) => sortProjectsByDate(a.createdAt, b.createdAt))
    const activeProjects: ProjectData[] = allProjects.filter((p) => !p.archived)

    // set state
    dispatch(setAllProjects(allProjects))
    dispatch(setAllProjectsNum(allProjects.length))
    dispatch(setActiveProjects(activeProjects))
    dispatch(setActiveProjectsNum(activeProjects.length))
    dispatch(setProjectsLoading(false))
  }

  // update project
  const insertProject = async (projectId: string, project: ProjectData): Promise<boolean> => {
    let result = false
    if (verifyAdmin(userId)) {
      await actor.insertCuratedProject(projectId, project).then(() => {
        result = true
      })
    }
    return result
  }

  const getProject = async (id: string): Promise<ProjectData> => {
    let result = null
    await actor.getCuratedProject(id).then((project: ProjectData) => {
      result = project
    })

    return result
  }

  return { refreshProjects, insertProject, getProject }
}

export default useBackend
