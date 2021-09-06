import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './features/orderSlice';
import dbReducer from './features/dbSlice';
import authReducer from './features/authSlice';
import queryReducer from './features/querySlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    db: dbReducer,
    auth: authReducer,

    query: queryReducer,
  },
});
