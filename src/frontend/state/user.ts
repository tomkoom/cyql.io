import type { RootState } from "@/state/_store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Tokens } from "./types/types"

interface UserState {
  accountId: string
  votingPower: number
  upvotedProjects: string[]
  nftIdsOwned: number[]
  balanceIcp: Tokens
}

const initialState: UserState = {
  accountId: "",
  votingPower: 1,
  upvotedProjects: [],
  nftIdsOwned: [],
  balanceIcp: { e8s: 0 },
}

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccountId(state, { payload }: PayloadAction<string>) {
      state.accountId = payload
    },
    setVotingPower(state, { payload }: PayloadAction<number>) {
      state.votingPower = payload
    },
    setNftIdsOwned(state, { payload }: PayloadAction<number[]>) {
      state.nftIdsOwned = payload
    },
    setUserBalanceIcp(state, { payload }: PayloadAction<Tokens>) {
      state.balanceIcp = payload
    },
    setClearUser(state) {
      state.accountId = initialState.accountId
      state.votingPower = initialState.votingPower
      state.upvotedProjects = initialState.upvotedProjects
      state.nftIdsOwned = initialState.nftIdsOwned
    },
  },
})

export const selectUser = (state: RootState) => state.user
export const selectAccountId = (state: RootState) => state.user.accountId
export const selectVotingPower = (state: RootState) => state.user.votingPower
export const selectNftIdsOwned = (state: RootState) => state.user.nftIdsOwned
export const selectUserBalanceIcp = (state: RootState) => state.user.balanceIcp

export const { setAccountId, setVotingPower, setNftIdsOwned, setUserBalanceIcp, setClearUser } = user.actions
export default user.reducer
