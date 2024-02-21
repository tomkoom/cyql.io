import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface UserState {
  accountId: string
  votingPower: number
  upvotedProjects: string[]
  nftIdsOwned: number[]
}

const initialState: UserState = {
  accountId: "",
  votingPower: 0,
  upvotedProjects: [],
  nftIdsOwned: [],
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

export const { setAccountId, setVotingPower, setNftIdsOwned, setClearUser } = user.actions
export default user.reducer
