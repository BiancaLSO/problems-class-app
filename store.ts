import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import problemsReducer from "./features/problems/problemSlice";
import usersReducer from "./features/users/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    problems: problemsReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
