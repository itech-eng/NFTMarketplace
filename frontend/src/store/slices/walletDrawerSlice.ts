import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
};

const walletDrawerSlice = createSlice({
  name: "walletDrawer",
  initialState,
  reducers: {
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setShowSidebar } = walletDrawerSlice.actions;

export default walletDrawerSlice.reducer;
