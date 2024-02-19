import {
  configureStore,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import authReducer from "./autheslice";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import accommodationReducer from "./accommodation";
import postReducer from "./postSlices";
import commentReducer from "./commentSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  accommodation: accommodationReducer,
  post: postReducer,
  comment: commentReducer,
});

const reducerProxy = (state, action) => {
  if (action.type === "logout/LOGOUT") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducerProxy);

export const logout = createAsyncThunk(
  "auth/logout",
  async function (_payload, thunkAPI) {
    thunkAPI.dispatch({ type: "logout/LOGOUT" });
  }
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
