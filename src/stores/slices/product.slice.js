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
        await axios.delete(process.env.REACT_APP_SERVER_JSON + 'listProduct/' + id);
        return id
    }
)

const searchProductByName = createAsyncThunk(
    "searchProductByName",
    async (name) => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + "listProduct?name_like=" + name);
        return res.data;
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        listProducts: [],
        searchData: []
    },
    reducers: {
        clearSearchData: (state, action) => {
            return {
                ...state,
                searchData: []
            }
        }
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
        // builder.addCase(creatProducts.fulfilled, (state, action) => {
        //     state.listProducts.push(action.payload)
        // });
        // delete product
        builder.addCase(deleteProductById.fulfilled, (state, action) => {
            state.listProducts = state.listProducts.filter(product => product.id !== action.payload)
        });
        // search product by name
        builder.addCase(searchProductByName.fulfilled, (state, action) => {
            state.searchData = [...action.payload]
            
        })
    },
});

export const productActions = {
    ...productSlice.actions,
    filterProductByType,
    findAllProducts,
    filterProductById,
    deleteProductById,
    searchProductByName
};

export default productSlice.reducer;
