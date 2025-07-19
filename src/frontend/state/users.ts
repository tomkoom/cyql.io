import type { RootState } from "@/state/_store"
import type { User } from "@/state/types/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UsersState {
  users: User[]
}

const initialState: UsersState = {
  users: [],
}

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<User[]>) {
      state.users = payload
    },
  },
})

export const selectUsers = (state: RootState) => state.users

export const { setUsers } = users.actions
export default users.reducer
