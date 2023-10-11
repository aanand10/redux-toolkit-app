import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "Loading",
});
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    // do not do this in this way
    // const res = await fetch("https://fakestoreapi.com/products");
    // setProducts(state, action) {
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunks : middleware in the redux , its function which returns new function
// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log("err", err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }

// async thumb : this was made for the better error handle according to the promise resolvement
//it generates 3 actions : pending , fulfilled , rejected
// export const fetchProducts = createAsyncThunk("products/fetch", async () => {
//   const res = await fetch("https://fakestoreapi.com/products");
//   const data = await res.json();
//   return data;
// });
const apiUrl = "http://3.7.252.58:4001/product/getAllProduct";

// Create a Redux thunk action for fetching data
export const fetchProducts = createAsyncThunk(
  "products/fetchData",
  async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "connect.sid=s%253AC9UlQ9M1W1aslddIqBNrrk68Yx4GleaF.OyLqPkC%252FpbJKf070EG6KIJoS70bHaP5GOYXB...",
        },
        body: JSON.stringify({
          limit: 100,
          page: 0,
          search: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error; // This will be captured as a rejected action
    }
  }
);
