import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  isMounted: false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setMounted(state, action) {
      state.isMounted = action.payload;
    },
    resetFilters(state) {
      state.categoryId = 0;
      state.sort = {
        name: "популярности",
        sortProperty: "rating",
      };
      state.isMounted = false;
      state.searchValue = "";
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setSearchValue,
  setFilters,
  setMounted,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
