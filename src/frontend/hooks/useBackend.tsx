import { useAuth } from "@/context/Auth"
import { verifyAdmin, sortProjectsByDate, serializeProjectsToString } from "@/utils/_index"
import type {
  ProjectV2,
  ProjectId,
  Paginated,
  RefreshProjectsArgs,
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
  refreshPaginated: (args: RefreshProjectsArgs) => Promise<void>
  addCuratedProject: (project: ProjectV2) => Promise<void>
  editCuratedProject: (project: ProjectV2) => Promise<void>
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
  const refreshPaginated = async (refreshArgs: RefreshProjectsArgs): Promise<void> => {
    if (!actor) return
    const { selectedPage, itemsPerPage, category } = refreshArgs

    dispatch(setPaginatedIsLoading(true))
    try {
      const getArgs: GetProjectsArgs = {
        secret: SECRET,
        category,
        openSource: [],
        onChain: [],
        sort: { newest_first: null },
        page: BigInt(selectedPage),
        pageSize: BigInt(itemsPerPage),
      }
      const res = await actor.getProjects(getArgs)

      if (res.length > 0) {
        const serializedData = serializeProjectsToString(res[0].data)
        const selectedPage = Number(res[0].selectedPage)
        const itemsPerPage = Number(res[0].itemsPerPage)

        // filter, sort
        const category = res[0].category
        const openSource = res[0].openSource
        const onChain = res[0].onChain
        const sort = res[0].sort

        const data: Paginated = {
          data: serializedData,

          // filter
          // ...

          // sort
          // ...

          // pagination
          selectedPage,
          itemsPerPage,
          startIndex: Number(res[0].startIndex),
          endIndex: Number(res[0].endIndex),
          totalItems: Number(res[0].totalItems),
          totalPages: Number(res[0].totalPages),
        }

        updateQueryParam("page", selectedPage.toString())
        updateQueryParam("itemsPerPage", itemsPerPage.toString())
        updateQueryParam("category", category)

        // state
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
