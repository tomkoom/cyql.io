import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/state/_store"

interface NftModal {
  nftModal: boolean
}

const initialState: NftModal = {
  nftModal: false,
}

const nftModal = createSlice({
  name: "nftModal",
  initialState,
  reducers: {
    setNftModal(state, { payload }: PayloadAction<boolean>) {
      state.nftModal = payload
    },
  },
})

export const selectNftModal = (state: RootState) => state.nftModal.nftModal

export const { setNftModal } = nftModal.actions
export default nftModal.reducer
