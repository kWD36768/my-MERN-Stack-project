const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: []
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setproducts: (state, action) => {
            state.value = action.payload;
             console.log('productslice') 
       
        }
    }
});

export const {setproducts} = productSlice.actions ; 

  
export default productSlice.reducer ;

