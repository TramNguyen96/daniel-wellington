import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const findAllProducts = createAsyncThunk(
    "findAllProducts",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'listProduct');
        return res.data
    }
)

const filterProductByType = createAsyncThunk(
    "filterProductByType",
    async (type) => {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_JSON}listProduct?type=${type}`);
        return res.data;
    }
);

const creatProducts = createAsyncThunk(
    "creatProducts",
    async () => {
        let res = await axios.post(process.env.REACT_APP_SERVER_JSON + 'listProduct');
        return res.data
    }
)
const productSlice = createSlice({
    name: "product",
    initialState: {
        listProducts: [],
    },
    extraReducers: (builder) => {
        // find all products
        builder.addCase(findAllProducts.fulfilled, (state, action) => {
            state.listProducts = [...action.payload];
        });
        // filter product by type
        builder.addCase(filterProductByType.fulfilled, (state, action) => {
            state.listProducts = [...action.payload];
        });
        // add product
        builder.addCase(creatProducts.fulfilled, (state, action) => {
            state.listProducts.push(action.payload)
        });
    },
});

export const productActions = {
    ...productSlice.actions,
    filterProductByType,
    findAllProducts,
    creatProducts
};

export default productSlice.reducer;
