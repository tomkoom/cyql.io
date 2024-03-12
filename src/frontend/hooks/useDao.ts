import { useAuth } from "@/context/Auth"
import { ProjectProposalData } from "@/state/_types/dao_types"
import { bigintToNum } from "@/utils/bigintToNum"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setProposals } from "@/state/dao/proposals"

interface UseDao {
  createProposal: (projectData: ProjectProposalData) => Promise<void>
  refreshProposals: () => Promise<void>
}

export const useDao = (): UseDao => {
  const dispatch = useAppDispatch()
  const { actor, isAuthenticated } = useAuth()

  const createProposal = async (projectData: ProjectProposalData): Promise<void> => {
    if (!actor) return
    if (!isAuthenticated) return
    const data = JSON.stringify(projectData)
    await actor.createProposal(data)
  }

  const refreshProposals = async (): Promise<void> => {
    if (!actor) return
    if (!isAuthenticated) return
    await actor.listProposals().then((res) => {
      const serialized = res.map((item) => bigintToNum(item))
      dispatch(setProposals(serialized))
    })
  }

  return { createProposal, refreshProposals }
}
