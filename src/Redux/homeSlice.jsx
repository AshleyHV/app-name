import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    isOpen: false,
  },
  reducers: {
    changeIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { changeIsOpen } = homeSlice.actions;
export default homeSlice.reducer;
