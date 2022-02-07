import { createSlice } from "@reduxjs/toolkit";

const theme = createSlice({
  name: "theme",
  initialState: {
    theme: { value: "dark" },
  },
  reducers: {
    setTheme({ theme }, { payload }) {
      theme.value = payload.value;
    },
  },
});

export const selectTheme = state => state.theme.theme.value;

export const { setTheme } = theme.actions;
export default theme.reducer;