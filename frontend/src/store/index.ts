import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { videoApiMiddleware, videoApiReducer } from "./api/video.api"

export const store = configureStore({
  reducer: combineReducers({
    videoApi: videoApiReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([videoApiMiddleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
