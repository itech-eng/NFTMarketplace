import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWider: false,
};

const contentWideSlice = createSlice({
  name: "Content-Wide",
  initialState,
  reducers: {
    isWiderEnable: (state) => {
      state.isWider = true;
    },
    isWiderDisable: (state) => {
      state.isWider = false;
    },
  },
});

export const { isWiderEnable, isWiderDisable } = contentWideSlice.actions;

export default contentWideSlice.reducer;
