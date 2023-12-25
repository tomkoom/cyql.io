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

  const addProject = async (project: ProjectData): Promise<void> => {
    if (!verifyAdmin(userId)) return
    if (project.id !== "") return

    await actor
      .addProject({
        ...project,
        createdAt: String(Date.now()),
      })
      .then((res) => {
        if (res) console.log(`added`, res)
      })
  }

  const editProject = async (project: ProjectData): Promise<void> => {
    if (!verifyAdmin(userId)) return
    if (project.id === "") return

    const id = BigInt(Number(project.id))
    const p = {
      ...project,
      id,
      updatedAt: String(Date.now()),
    }

    await actor.editProject(id, p).then((res) => {
      if (res) console.log(`edited:`, res)
    })
  }

  return { refreshProjects, addProject, editProject }
}

export default useBackend
