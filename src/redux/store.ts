import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
});
const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store, persistor };
