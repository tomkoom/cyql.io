import { useAuth } from "@/context/Auth"
import { sortProjectsByDate } from "@/utils/sortProjectsByDate"
import type { Project, ProjectId } from "@/state/_types/types"
import { verifyAdmin } from "@/utils/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import {
  setActiveProjects,
  setActiveProjectsNum,
  setAllProjects,
  setAllProjectsNum,
  setProjectsLoading,
} from "@/state/projects"

export const useBackend = () => {
  const dispatch = useAppDispatch()
  const { actor, userId } = useAuth()

  const refreshProjects = async (): Promise<void> => {
    if (!actor) return

    dispatch(setProjectsLoading(true))
    const allProjects: Project[] = await actor
      .listProjects()
      .then((p) => p.map((p) => ({ ...p, id: Number(p.id).toString() })))

    allProjects.sort((a, b) => sortProjectsByDate(a.createdAt, b.createdAt))
    const activeProjects: Project[] = allProjects.filter((p) => !p.archived)

    // set state
    dispatch(setAllProjects(allProjects))
    dispatch(setAllProjectsNum(allProjects.length))
    dispatch(setActiveProjects(activeProjects))
    dispatch(setActiveProjectsNum(activeProjects.length))
    dispatch(setProjectsLoading(false))
  }

  const addProject = async (project: Project): Promise<void> => {
    if (!verifyAdmin(userId)) return
    if (project.id !== "") return

    await actor.addProject({
      ...project,
      id: BigInt(0),
      createdAt: String(Date.now()),
    })
  }

  const editProject = async (project: Project): Promise<void> => {
    if (!verifyAdmin(userId)) return
    if (project.id === "") return

    const id = BigInt(Number(project.id))
    const p = {
      ...project,
      id,
      updatedAt: String(Date.now()),
    }

    await actor.editProject(id, p)
  }

  const updateUpvote = async (projectId: ProjectId): Promise<void> => {
    await actor.updateUpvote(BigInt(projectId))
  }

  return {
    refreshProjects,
    addProject,
    editProject,
    updateUpvote,
  }
}
