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
  QueryParams,
} from "@/state/_types/curated_projects_types"
import { SECRET } from "@/constants/constants"
import type { GetProjectsArgs } from "../../declarations/backend/backend.did"
import { useQueryParams } from "@/hooks/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import {
  setActiveCuratedProjectsNum,
  setAllCuratedProjects,
  setCuratedProjectsIsLoading,
} from "@/state/curatedProjects"
import { setPaginated, setPaginatedIsLoading } from "@/state/projects/paginated"
import { setHomeHighlighted, setHomeNew } from "@/state/home/home"
import { setProject } from "@/state/project"
import { setQueryParams } from "@/state/projects/queryParams"

interface UseBackend {
  refreshCuratedProjects: () => Promise<void>
  refreshPaginated: (queryParams: QueryParams) => Promise<void>
  refreshNew: (length: number) => Promise<void>
  refreshHighligted: (category: string, length: number) => Promise<void>
  refreshActiveProjectsNum: () => Promise<void>
  getProjectById: (id: string) => Promise<void>
  addCuratedProject: (project: Project) => Promise<void>
  editCuratedProject: (project: Project) => Promise<void>
  updateCuratedProjectUpvote: (projectId: ProjectId) => Promise<string>
}

export const useBackend = (): UseBackend => {
  const dispatch = useAppDispatch()
  const { actor, userId } = useAuth()
  const { updateQueryParams } = useQueryParams()

  const refreshCuratedProjects = async (): Promise<void> => {
    if (!actor) return

    dispatch(setCuratedProjectsIsLoading(true))
    try {
      const allProjects = await actor.listProjectsV2(SECRET)
      const serialized = allProjects.map((p) => ({ ...p, id: p.id.toString() }))
      serialized.sort((a, b) => sortProjectsByDate(a.createdAt, b.createdAt))
      // const activeProjects: Project[] = serialized.filter((p) => !p.archived)

      // set state
      dispatch(setAllCuratedProjects(serialized))
      // dispatch(setActiveCuratedProjects(activeProjects))
      // dispatch(setProjectsPaginationTotalItems(activeProjects.length))
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setCuratedProjectsIsLoading(false))
    }
  }

  // get paginated
  const refreshPaginated = async (queryParams: QueryParams): Promise<void> => {
    if (!actor) return

    dispatch(setPaginatedIsLoading(true))
    try {
      const res = await actor.getProjects({
        secret: SECRET,
        ...queryParams,
        selectedPage: BigInt(queryParams.selectedPage),
        itemsPerPage: BigInt(queryParams.itemsPerPage),
      })

      if (res.length > 0) {
        const serializedData = serializeProjectsToString(res[0].data)
        const selectedPage = Number(res[0].selectedPage)
        const itemsPerPage = Number(res[0].itemsPerPage)

        const paginated: Paginated = {
          data: serializedData,

          // pagination
          selectedPage,
          itemsPerPage,
          startIndex: Number(res[0].startIndex),
          endIndex: Number(res[0].endIndex),
          totalItems: Number(res[0].totalItems),
          totalPages: Number(res[0].totalPages),
        }

        // set params string
        const q = res[0].q
        const category = res[0].category
        const openSource = filterToSearchParam(res[0].openSource)
        const onChain = filterToSearchParam(res[0].onChain)
        const sort = sortToSearchParam(res[0].sort)
        updateQueryParams({
          q,
          selectedPage: selectedPage.toString(),
          itemsPerPage: itemsPerPage.toString(),
          category,
          openSource,
          onChain,
          sort,
        })

        // set params state
        dispatch(
          setQueryParams({
            q,
            selectedPage: selectedPage,
            itemsPerPage: itemsPerPage,
            category,
            openSource: res[0].openSource,
            onChain: res[0].onChain,
            sort: res[0].sort,
          })
        )

        // set paginated data
        dispatch(setPaginated(paginated))
      } else {
        console.log(res)
      }
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setPaginatedIsLoading(false))
    }
  }

  const refreshNew = async (length: number): Promise<void> => {
    try {
      const res = await actor.getNewProjects(SECRET, BigInt(length))
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setHomeNew(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshHighligted = async (category: string, length: number): Promise<void> => {
    try {
      const str = category
      const replacement = "_"
      const key = str.replace(/\//g, replacement).toLowerCase() // change slashes to underscore
      const res = await actor.getHighlightedProjects(SECRET, category, BigInt(length))
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setHomeHighlighted({ [key as string]: serialized }))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshActiveProjectsNum = async (): Promise<void> => {
    try {
      const res = await actor.getActiveProjectsNum(SECRET)
      dispatch(setActiveCuratedProjectsNum(Number(res)))
    } catch (error) {
      throw new Error(error)
    }
  }

  const getProjectById = async (id: string): Promise<void> => {
    try {
      const res = await actor.getProjectById(SECRET, BigInt(id))
      if (res.length > 0) {
        const p = { ...res[0], id: res[0].id.toString() }
        dispatch(setProject(p))
      }
    } catch (error) {
      throw new Error(error)
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
    refreshNew,
    refreshHighligted,
    refreshActiveProjectsNum,
    getProjectById,

    // ...
    addCuratedProject,
    editCuratedProject,
    updateCuratedProjectUpvote,
  }
}
