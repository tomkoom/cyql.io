import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: { value: "dark" },
  },
  reducers: {
    setTheme(state, action) {
      state.theme.value = action.payload.value;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;