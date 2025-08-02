import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "../api/baseAPI";
import userReducer from "../features/auth/userSlice";
import authReducer from "../features/auth/authTokenSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistedUserReducer = persistReducer(
  {
    key: "user",
    storage,
  },
  userReducer
);

const persistedAuthReducer = persistReducer(
  {
    key: "auth",
    storage,
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,

    user: persistedUserReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
