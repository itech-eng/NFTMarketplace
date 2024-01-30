import { compose, createSlice } from "@reduxjs/toolkit";
import { removeCookies, getCookie } from "cookies-next";
const initialState = {
  nightMode: false,
};

const nightModeSlice = createSlice({
  name: "walletDrawer",
  initialState,
  reducers: {
    toggleNightMode: (state: any) => {
      const theme = localStorage.getItem("theme");
      if (theme === "light") {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        state.nightMode = true;
      } else if (theme === "dark") {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
        state.nightMode = false;
      } else if (!theme) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        state.nightMode = true;
      }
    },
    initialCheckTheme: (state: any) => {
      const theme = localStorage.getItem("theme");
      if (theme === "light") {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        state.nightMode = false;
      } else if (theme === "dark") {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        state.nightMode = true;
      }
    },
  },
});

export const { toggleNightMode, initialCheckTheme } = nightModeSlice.actions;

export default nightModeSlice.reducer;
