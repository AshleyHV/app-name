import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "nav",
  initialState: {
    isOpen: false,
    isOpenModal: false,
  },
  reducers: {
    changeIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    changeIsOpenModal: (state, action) => {
      state.isOpenModal = action.payload;
    },
  },
});

export const { changeIsOpen, changeIsOpenModal } = navSlice.actions;

export default navSlice.reducer;
