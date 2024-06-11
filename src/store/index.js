import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./news-slice";
import searchSlice from "./search-slice";

const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
