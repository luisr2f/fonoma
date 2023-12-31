import { configureStore } from "@reduxjs/toolkit";

import symbolListReducer from "./slices/symbolListSlice";
import exchangeRateReducer from "./slices/exchangeRateSlice";

const store = configureStore({
  reducer: {
    symbolList: symbolListReducer,
    exchangeRate: exchangeRateReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
