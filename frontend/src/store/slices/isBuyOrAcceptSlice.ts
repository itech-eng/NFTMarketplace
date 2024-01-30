import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBuying: false,
  isAccepting: false,
  error: null,
};

const isBuyOrAcceptSlice = createSlice({
  name: "isBuyOrAcceptSlice",
  initialState,
  reducers: {
    setIsBuying: (state, action) => {
      state.isBuying = action.payload;
    },
    setIsAccepting: (state, action) => {
      state.isAccepting = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setIsBuying, setIsAccepting, setError } = isBuyOrAcceptSlice.actions;

export default isBuyOrAcceptSlice.reducer;
