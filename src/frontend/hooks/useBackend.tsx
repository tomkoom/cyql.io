import { useAuth } from "@/context/Auth"
import {
  verifyAdmin,
  sortProjectsByDate,
  serializeProjectsToString,
  filterToSearchParam,
  sortToSearchParam,
} from "@/utils/_index"
import type {
  Project,
  ProjectId,
  Paginated,
  RefreshProjectsParams,
} from "@/state/_types/curated_projects_types"
import { SECRET } from "@/constants/constants"
import type { GetProjectsArgs } from "../../declarations/backend/backend.did"
import { useQueryParams } from "@/hooks/_index"

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
  refreshPaginated: (args: RefreshProjectsParams) => Promise<void>
  addCuratedProject: (project: Project) => Promise<void>
  editCuratedProject: (project: Project) => Promise<void>
  updateCuratedProjectUpvote: (projectId: ProjectId) => Promise<string>
}

export const useBackend = (): UseBackend => {
  const dispatch = useAppDispatch()
  const { actor, userId } = useAuth()
  const { updateQueryParam } = useQueryParams()

  const refreshCuratedProjects = async (): Promise<void> => {
    if (!actor) return

    dispatch(setCuratedProjectsIsLoading(true))
    try {
      const allProjects = await actor.listProjectsV2(SECRET)
      const serialized = allProjects.map((p) => ({ ...p, id: p.id.toString() }))
      serialized.sort((a, b) => sortProjectsByDate(a.createdAt, b.createdAt))
      const activeProjects: Project[] = serialized.filter((p) => !p.archived)

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
  const refreshPaginated = async (refreshArgs: RefreshProjectsParams): Promise<void> => {
    if (!actor) return

    dispatch(setPaginatedIsLoading(true))
    try {
      const getArgs: GetProjectsArgs = {
        secret: SECRET,
        ...refreshArgs,
        selectedPage: BigInt(refreshArgs.selectedPage),
        itemsPerPage: BigInt(refreshArgs.itemsPerPage),
      }
      const res = await actor.getProjects(getArgs)

      if (res.length > 0) {
        const serializedData = serializeProjectsToString(res[0].data)
        const selectedPage = Number(res[0].selectedPage)
        const itemsPerPage = Number(res[0].itemsPerPage)

        // filter, sort
        const category = res[0].category
        const openSource = filterToSearchParam(res[0].openSource)
        const onChain = filterToSearchParam(res[0].onChain)
        const sort = sortToSearchParam(res[0].sort)

        const data: Paginated = {
          data: serializedData,

          // pagination
          selectedPage,
          itemsPerPage,
          startIndex: Number(res[0].startIndex),
          endIndex: Number(res[0].endIndex),
          totalItems: Number(res[0].totalItems),
          totalPages: Number(res[0].totalPages),
        }

        // set search params
        updateQueryParam("page", selectedPage.toString())
        updateQueryParam("itemsPerPage", itemsPerPage.toString())
        updateQueryParam("category", category)
        updateQueryParam("openSource", openSource)
        updateQueryParam("onChain", onChain)
        updateQueryParam("sort", sort)

        // set pagination
        dispatch(setPaginated(data))
      } else {
        console.log(res)
      }
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setPaginatedIsLoading(false))
    }
  }

  const addCuratedProject = async (project: Project): Promise<void> => {
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

  const editCuratedProject = async (project: Project): Promise<void> => {
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
