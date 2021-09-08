import { configureStore } from '@reduxjs/toolkit';
import dbsReducer from './features/dbsSlice';
import objectsReducer from './features/objectsSlice';
import authReducer from './features/authSlice';
import queryReducer from './features/querySlice';

export const store = configureStore({
  reducer: {
    objects: objectsReducer,
    dbs: dbsReducer,
    auth: authReducer,

    query: queryReducer,
  },
});
