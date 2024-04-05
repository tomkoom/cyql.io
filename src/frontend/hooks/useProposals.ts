import { useAuth } from "@/context/Auth"
import type { ProjectProposalData, VoteArgs } from "@/state/_types/dao_types"
import { bigintToString, notifyErr, notifySuccess } from "@/utils/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setProposals } from "@/state/dao/proposals"

interface UseProposals {
  createProposal: (projectData: ProjectProposalData) => Promise<void>
  refreshProposals: () => Promise<void>
  vote: (voteArgs: VoteArgs) => Promise<void>
}

export const useProposals = (): UseProposals => {
  const dispatch = useAppDispatch()
  const { proposals, isAuthenticated } = useAuth()

  const createProposal = async (projectData: ProjectProposalData): Promise<void> => {
    if (!proposals) return
    if (!isAuthenticated) return

    try {
      const data = JSON.stringify(projectData)
      await proposals.createProposal(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  const refreshProposals = async (): Promise<void> => {
    if (!proposals) return

    try {
      const p = await proposals.listProposals()
      const serialized = p.map((item) => bigintToString(item))
      dispatch(setProposals(serialized))
    } catch (e) {
      throw new Error(e)
    }
  }

  const vote = async (voteArgs: VoteArgs): Promise<void> => {
    if (!proposals) return
    if (!isAuthenticated) return

    try {
      const formatted = {
        ...voteArgs,
        ...{ proposalId: BigInt(voteArgs.proposalId) },
      }
      const res = await proposals.vote(formatted)
      if ("ok" in res) {
        notifySuccess(`Voted. Proposal state: ${JSON.stringify(res)}`)
      } else {
        notifyErr(JSON.stringify(res))
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  return { createProposal, refreshProposals, vote }
}
