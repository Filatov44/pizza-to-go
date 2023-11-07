import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 export const fetchPizzasItems = createAsyncThunk("pizza/fetchPizzasStatus", async (params) => {
 const {isCategory, sortProperty, order, isSearch} = params;
  
     const { data } = await axios.get(
    `https://6426c3f6556bad2a5b576f0b.mockapi.io/pizzas?${isCategory}&sortBy=${sortProperty}&order=${order}&${isSearch}`
  );
  return data;
});

const initialState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzasItems.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzasItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzasItems.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
