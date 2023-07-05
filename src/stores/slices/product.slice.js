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

const filterProductById = createAsyncThunk(
    "filterProductById",
    async (id) => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + "listProduct/" + id);
        return res.data;
    }
);

const deleteProductById = createAsyncThunk(
    "deleteProductById",
    async (id) => {
        //http://localhost:4000/users/1
        let res = await axios.delete(process.env.REACT_APP_SERVER_JSON + 'listProduct/' + id);
        return id
    }
)

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
        // filter product by id
        builder.addCase(filterProductById.fulfilled, (state, action) => {
            state.listProducts = [action.payload]
        });
        // add product
        builder.addCase(creatProducts.fulfilled, (state, action) => {
            state.listProducts.push(action.payload)
        });
        // delete product
        builder.addCase(deleteProductById.fulfilled, (state, action) => {
            state.listProducts = state.listProducts.filter(product => product.id != action.payload)
        });
    },
});

export const productActions = {
    ...productSlice.actions,
    filterProductByType,
    findAllProducts,
    filterProductById,
    creatProducts,
    deleteProductById
};

export default productSlice.reducer;
