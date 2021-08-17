import reducer from "./reducer";
import tokenLogger from "./middleware/tokenLogger";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    tokenLogger(),
  ],
});

const persistor = persistStore(store);
export { persistor, store };
