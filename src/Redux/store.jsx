import { configureStore } from '@reduxjs/toolkit';
import navReducer from './navSlice';
import productsSlice from './productsSlice';
import homeSlice from './homeSlice';

export default configureStore({
  reducer: {
    nav: navReducer,
    products: productsSlice,
    home: homeSlice,
  }
})
