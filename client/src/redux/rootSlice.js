import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
    reloadData: false,
  },

  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },

    HideLoading: (state, action) => {
      state.loading = false;
    },

    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },

    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },

    // ✅ ONLY ADDITION (IMPORTANT)
    removeEnquiry: (state, action) => {
      if (state.portfolioData?.enquiry) {
        state.portfolioData.enquiry = state.portfolioData.enquiry.filter(
          (item) => item._id !== action.payload,
        );
      }
    },
  },
});

export default rootSlice.reducer;

// 👇 bas yaha add hua
export const {  ShowLoading,  HideLoading,  setPortfolioData,  ReloadData,  removeEnquiry} = rootSlice.actions;
