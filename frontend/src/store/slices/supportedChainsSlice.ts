import { createSlice } from "@reduxjs/toolkit";

interface supportedChainsType {
  supportedChains: null | number[];
}

const initialState: supportedChainsType = {
  supportedChains: null,
};

const supportedChainsSlice = createSlice({
  name: "supportedChains",
  initialState,
  reducers: {
    setSupportedChains: (state, action) => {
      state.supportedChains = action.payload;
    },
  },
});

export const { setSupportedChains } = supportedChainsSlice.actions;

export default supportedChainsSlice.reducer;
