import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk"; // thunk 함수를 import

import rootReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["signup", "signin", "googleSignin", "profileModal"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["register", "rehydrate"],
        ignoredPaths: ["_persist"],
      },
    }).concat(thunk), // thunk 미들웨어 추가
});

export const persistor = persistStore(store);
