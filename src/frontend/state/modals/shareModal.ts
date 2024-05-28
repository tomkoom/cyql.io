import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/state/_store"

interface ShareModal {
  shareModal: boolean
}

const initialState: ShareModal = {
  shareModal: false,
}

const shareModal = createSlice({
  name: "shareModal",
  initialState,
  reducers: {
    setShareModal(state, { payload }: PayloadAction<boolean>) {
      state.shareModal = payload
    },
  },
})

export const selectShareModal = (state: RootState) => state.shareModal.shareModal

export const { setShareModal } = shareModal.actions
export default shareModal.reducer
