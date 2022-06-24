import { createSlice } from "@reduxjs/toolkit";
import { baseUrlDatabase } from "../Api/constants";

export const productsSlice = createSlice({
  name: "nav",
  initialState: {
    products: [],
    loading: false,
    error: null,
    cart: [],
    productListFiltered: null,
  },
  reducers: {
    productsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    productsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productsLoaded: (state, action) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart.splice(action.payload, 1);
    },
    filterProducts: (state, action) => {
      state.productListFiltered = state.products.filter(
        (product) => product.category === action.payload
      );
    },
    cleanFilter: (state) => {
      state.productListFiltered = null;
    },
  },
});

export const { addToCart, removeFromCart, filterProducts, cleanFilter } =
  productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(productsSlice.actions.productsLoading());
  const timeOut = setTimeout(() => {
    dispatch(
      productsSlice.actions.productsFailed("Se tardo en cargar los productos")
    );
  }, 10000);
  const result = await fetch(`${baseUrlDatabase}/products.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error en la carga de los productos");
    })
    .then((data) => {
      clearTimeout(timeOut);
      return data;
    })
    .then((products) =>
      dispatch(productsSlice.actions.productsLoaded(products))
    )
    .catch((error) =>
      dispatch(productsSlice.actions.productsFailed(error.message))
    );
};

export default productsSlice.reducer;
