import { configureStore } from "@reduxjs/toolkit";

import symbolListReducer from "./slices/symbolListSlice";

const store = configureStore({
  reducer: {
    symbolList: symbolListReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
