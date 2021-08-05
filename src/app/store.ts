import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import popularReducer from "../features/twitter/popular/popularSlice";

export const store = configureStore({
  reducer: {
    popular: popularReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
