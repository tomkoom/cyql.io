import { useAuth } from "@/context/Auth"
import { verifyAdmin, sortProjectsByDate, serializeProjectsToString } from "@/utils/_index"
import type {
  ProjectV2,
  ProjectId,
  Paginated,
  SortOptions,
} from "@/state/_types/curated_projects_types"
import { SECRET } from "@/constants/constants"
import { GetProjectsArgs } from "../../declarations/backend/backend.did"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import {
  setActiveCuratedProjects,
  setAllCuratedProjects,
  setCuratedProjectsIsLoading,
} from "@/state/curatedProjects"
import { setProjectsPaginationTotalItems } from "@/state/projects/projectsPagination"
import { setPaginated, setPaginatedIsLoading } from "@/state/projects/paginated"

interface UseBackend {
  refreshCuratedProjects: () => Promise<void>
  refreshPaginated: (sortOption: SortOptions, page: number, pageSize: number) => Promise<void>
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

  // get paginated
  const refreshPaginated = async (
    sort: SortOptions,
    page: number,
    pageSize: number
  ): Promise<void> => {
    if (!actor) return

    dispatch(setPaginatedIsLoading(true))
    try {
      const args: GetProjectsArgs = {
        secret: SECRET,
        sort,
        page: BigInt(page),
        pageSize: BigInt(pageSize),
      }
      const paginated = await actor.getProjects(args)

      if (paginated.length > 0) {
        const serializedData = serializeProjectsToString(paginated[0].data)
        const data: Paginated = {
          data: serializedData,
          selectedPage: Number(paginated[0].selectedPage),
          itemsPerPage: Number(paginated[0].itemsPerPage),
          startIndex: Number(paginated[0].startIndex),
          endIndex: Number(paginated[0].endIndex),
          totalItems: Number(paginated[0].totalItems),
          totalPages: Number(paginated[0].totalPages),
        }
        dispatch(setPaginated(data))
      } else {
        console.log(paginated)
      }
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setPaginatedIsLoading(false))
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
    refreshPaginated,
    addCuratedProject,
    editCuratedProject,
    updateCuratedProjectUpvote,
  }
}
