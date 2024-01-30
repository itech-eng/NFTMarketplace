import { configureStore } from "@reduxjs/toolkit";
import contentWideSlice from "./slices/contentWideSlice";
import isBuyOrAcceptSlice from "./slices/isBuyOrAcceptSlice";
import nightModeSlice from "./slices/nightModeSlice";
import paymentTokenSlice from "./slices/paymentTokenSlice";
import settingsSlice from "./slices/settingsSlice";
import supportedChainsSlice from "./slices/supportedChainsSlice";
import userDataSlice from "./slices/userDataSlice";
import walletDrawerSlice from "./slices/walletDrawerSlice";
import web3LibrarySlice from "./slices/web3LibrarySlice";

export const store = configureStore({
  reducer: {
    contentWide: contentWideSlice,
    userData: userDataSlice,
    web3Library: web3LibrarySlice,
    settings: settingsSlice,
    sidebar: walletDrawerSlice,
    nightMode: nightModeSlice,
    paymentTokens: paymentTokenSlice,
    chains: supportedChainsSlice,
    isBuyOrAcceptSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
