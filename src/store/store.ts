import { configureStore } from "@reduxjs/toolkit"

import userReducer from "../slices/userSlice"
import authReducer from "../slices/authSlice"
import videoReducer from "../slices/videoSlice"
import { apiSlice } from "../slices/events-api-slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    video: videoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
