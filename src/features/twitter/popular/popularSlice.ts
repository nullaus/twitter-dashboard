import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { fetchData, fetchDataSync } from "./popularAPI";

export interface FetchState {
  value: any;
  status: "idle" | "fetching" | "failed";
}

const initialState: FetchState = {
  value: {},
  status: "idle",
};

export const fetchAsync = createAsyncThunk(
  "twitter/popular/fetchData",
  async (handle: string) => {
    const response = await fetchData(handle);
    return response.json();
  }
);

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    fetchSync: (state, action: PayloadAction<string>) => {
      state.value = fetchDataSync(action.payload);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "fetching";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const { fetchSync } = popularSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPopular = (state: RootState) => state.popular.value;

export default popularSlice.reducer;