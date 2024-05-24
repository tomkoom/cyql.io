import { useAuth } from "@/context/Auth"
import { verifyAdmin, sortProjectsByDate } from "@/utils/_index"
import type { ProjectV2, ProjectId } from "@/state/_types/curated_projects_types"
import { SECRET } from "@/constants/constants"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import {
  setActiveCuratedProjects,
  setAllCuratedProjects,
  setCuratedProjectsIsLoading,
} from "@/state/curatedProjects"
import { setProjectsPaginationTotalItems } from "@/state/projects/projectsPagination"

interface UseBackend {
  refreshCuratedProjects: () => Promise<void>
  addCuratedProject: (project: ProjectV2) => Promise<void>
  editCuratedProject: (project: ProjectV2) => Promise<void>
  updateCuratedProjectUpvote: (projectId: ProjectId) => Promise<string>
}

export const useBackend = (): UseBackend => {
  const dispatch = useAppDispatch()
  const { actor, userId } = useAuth()

  const refreshCuratedProjects = async (): Promise<void> => {
    if (!actor) return

    dispatch(setCuratedProjectsIsLoading(true))
    try {
      const allProjects = await actor.listProjectsV2(SECRET)
      const serialized = allProjects.map((p) => ({ ...p, id: p.id.toString() }))
      serialized.sort((a, b) => sortProjectsByDate(a.createdAt, b.createdAt))
      const activeProjects: ProjectV2[] = serialized.filter((p) => !p.archived)

      // set state
      dispatch(setAllCuratedProjects(serialized))
      dispatch(setActiveCuratedProjects(activeProjects))
      dispatch(setProjectsPaginationTotalItems(activeProjects.length))
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setCuratedProjectsIsLoading(false))
    }
  }

  const addCuratedProject = async (project: ProjectV2): Promise<void> => {
    if (!actor) return
    if (!verifyAdmin(userId)) return
    if (project.id) return

    try {
      await actor.addProjectV2({
        ...project,
        id: BigInt(0), // placeholder id
        createdAt: String(Date.now()),
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  const editCuratedProject = async (project: ProjectV2): Promise<void> => {
    if (!actor) return
    if (!verifyAdmin(userId)) return
    if (!project.id) return

    try {
      const id = BigInt(project.id)
      const p = {
        ...project,
        id,
        updatedAt: String(Date.now()),
      }
      await actor.editProjectV2(id, p)
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateCuratedProjectUpvote = async (projectId: ProjectId): Promise<string> => {
    if (!actor) return

    try {
      const id = BigInt(projectId)
      const res = await actor.updateUpvoteV2(SECRET, id)
      return res
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    refreshCuratedProjects,
    addCuratedProject,
    editCuratedProject,
    updateCuratedProjectUpvote,
  }
}
