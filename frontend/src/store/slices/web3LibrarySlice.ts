import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  web3Library: {},
  web3LibraryError: null,
};

const web3LibrarySlice = createSlice({
  name: "Web3Library",
  initialState,
  reducers: {
    setWeb3LibarayData: (state, action) => {
      state.web3Library = action.payload;
    },
    setweb3LibraryError: (state, action) => {
      state.web3LibraryError = action.payload;
    },
  },
});

export const { setWeb3LibarayData, setweb3LibraryError } =
  web3LibrarySlice.actions;

export default web3LibrarySlice.reducer;
