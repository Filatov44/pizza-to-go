import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

// uId = uuidv4();

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //       state.items.push(action.payload);
    //       state.totalPrice = state.items.reduce((sum, obj) => {
    //           return obj.price + sum;
    //       }, 0)
    // },
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      findItem
        ? findItem.count++
        : state.items.push({
            ...action.payload,
            count: 1,
            uId: uuidv4(),
          });

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    // removeItems(state, action) {
    //   state.items = state.items.filter((obj) => obj.id !== action.payload);
    // },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.uId;
      });
      findItem && findItem.count--;
      state.totalPrice -= findItem.price;
    },

    removeItem(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.uId;
      });
      state.totalPrice -= findItem.price * findItem.count;
      state.items = state.items.filter((obj) => {
        return (
          obj.id !== action.payload.uId 
        );
      });
    },

    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItem,minusItem, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
