import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  userDataError: null,
};

const userDataSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserDataError: (state, action) => {
      state.userDataError = action.payload;
    },
  },
});

export const { setUserData, setUserDataError } = userDataSlice.actions;

export default userDataSlice.reducer;
