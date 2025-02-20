import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:3000/cart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// 🛒 Add to Cart (Thunk)
export const addToCart = createAsyncThunk("cart/addToCart", async (product, { rejectWithValue }) => {
    try {

        console.log('sa');
        const response = await axios.post(API_URL, { name: product.name, price: product.price, image: product.image, productid: product.id, quantity: 1, userid: product.userid });
        return response.data;
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.response.data);
    }
});

export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ id, quantity }) => {
    const response = await axios.patch(`${API_URL}/${id}`, { quantity });
    return response.data;
});
export const updateCart = createAsyncThunk("cart/updateCart", async ({ id, quantity }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, { quantity });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});




const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {

        // removeFromCart: (state, action) => {
        //     return state.filter((item) => item.id !== action.payload);
        // },
    },

    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            }).addCase(updateCartQuantity.fulfilled, (state, action) => {
                const item = state.items.find((i) => i.id === action.payload.id);
                if (item) item.quantity = action.payload.quantity;
            })
            // Add to Cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items.push(action.payload);
            }).addCase(addToCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            }).addCase(updateCart.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index].quantity = action.payload.quantity;
            })
            // Remove from Cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default cartSlice.reducer;