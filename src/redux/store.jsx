import { configureStore, createSlice } from "@reduxjs/toolkit"; 

let first = createSlice({
  name: "first",
  initialState: {},
  reducers: {},
});

export default configureStore({
  reducer: { first: first.reducer },
});