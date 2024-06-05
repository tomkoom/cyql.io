import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

export type Tabs = "upvotes" | "wallet"

interface ProfileState {
  tab: Tabs
}

const initialState: ProfileState = {
  tab: "wallet",
}

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileTab(state, { payload }: PayloadAction<Tabs>) {
      state.tab = payload
    },
  },
})

export const selectProfile = (state: RootState) => state.profile

export const { setProfileTab } = profile.actions
export default profile.reducer
