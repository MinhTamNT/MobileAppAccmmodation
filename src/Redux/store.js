import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AutheSlice/autheslice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
const reducers = combineReducers({
  auth: authReducer,
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);
export { store, persistor };
