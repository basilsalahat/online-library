import { configureStore } from "@reduxjs/toolkit";
import searchTextReducer from "./searchTextSlice";

const store = configureStore({
  reducer: {
    searchText: searchTextReducer,
  },
});

export default store;
