import { createSlice } from "@reduxjs/toolkit";

const template = createSlice({
  name: "template",
  initialState: {
    template: "template",
  },
  reducers: {
    setTemplate(state, { payload }) {
      state.template = payload;
    },
  },
});

const selectTemplate = (state) => state.template.template;
export { selectTemplate };

export const { setTemplate } = template.actions;
export default template.reducer;
