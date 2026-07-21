const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadData: (state, action) => {
            const payload = action.payload;
            state.value = Array.isArray(payload) ? payload : payload?.data ?? [];
        },

        deleteprodcutfromcart: (state, action) => {
            state.value = state.value.filter((cartpro) => cartpro._id !== action.payload);
        },

        updateproductquantity: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {loadData , deleteprodcutfromcart , updateproductquantity} = cartSlice.actions ; 

  
export default cartSlice.reducer ;

