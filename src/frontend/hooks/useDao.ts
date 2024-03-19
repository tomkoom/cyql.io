import { useAuth } from "@/context/Auth"
import type { ProjectProposalData, VoteArgs, VoteArgs2 } from "@/state/_types/dao_types"
import { bigintToString, notifyErr, notifySuccess } from "@/utils/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setProposals } from "@/state/dao/proposals"

interface UseDao {
  createProposal: (projectData: ProjectProposalData) => Promise<void>
  refreshProposals: () => Promise<void>
  vote: (voteArgs: VoteArgs2) => Promise<void>
}

export const useDao = (): UseDao => {
  const dispatch = useAppDispatch()
  const { actor, isAuthenticated } = useAuth()

  const createProposal = async (projectData: ProjectProposalData): Promise<void> => {
    if (!actor) return
    if (!isAuthenticated) return

    try {
      const data = JSON.stringify(projectData)
      await actor.createProposal(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  const refreshProposals = async (): Promise<void> => {
    if (!actor) return

    try {
      const proposals = await actor.listProposals()
      const serialized = proposals.map((item) => bigintToString(item))
      dispatch(setProposals(serialized))
    } catch (e) {
      throw new Error(e)
    }
  }

  const vote = async (voteArgs: VoteArgs2): Promise<void> => {
    if (!actor) return
    if (!isAuthenticated) return

    try {
      const formatted = {
        ...voteArgs,
        ...{ votingPower: BigInt(voteArgs.votingPower) },
        ...{ proposalId: BigInt(voteArgs.proposalId) },
      }
      const res = await actor.vote(formatted)
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
