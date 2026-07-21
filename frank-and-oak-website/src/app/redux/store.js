import productSlice from "./slices/productslice";
import cartReducer from "./slices/cartslice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartReducer,
  },
});