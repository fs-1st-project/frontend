import { createSlice } from "@reduxjs/toolkit";

export const fetchNewsData = () => {
  return async (dispatch) => {
    // fetch data with api
    const fetchData = async () => {
      const response = await fetch(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=1fc542c3515443c1aaeeea95ae52f0cf"
      );

      if (!response.ok) {
        throw new Error("전체 뉴스 패치 실패");
      }

      const newsData = await response.json();

      // get the array from newData (articles has an array of data)
      return newsData.articles;
    };

    try {
      const newsArticlesData = await fetchData();
      dispatch(newsActions.replaceNews(newsArticlesData));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    email: null,
    password: null,
  },
  reducers: {
    // replaceNews(state, action) {
    //   state.news = action.payload;
    // },
  },
});

export const newsActions = signupSlice.actions;

export default signupSlice;
