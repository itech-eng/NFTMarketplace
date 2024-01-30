import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: null,
  settingsError: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setSettingsError: (state, action) => {
      state.settingsError = action.payload;
    },
  },
});

export const { setSettings, setSettingsError } = settingsSlice.actions;

export default settingsSlice.reducer;
