import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface TemplateState {
  template: string
}

const initialState: TemplateState = {
  template: "",
}

const template = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate(state, { payload }: PayloadAction<string>) {
      state.template = payload
    },
  },
})

const selectTemplate = (state: RootState) => state.template.template
export { selectTemplate }

export const { setTemplate } = template.actions
export default template.reducer
