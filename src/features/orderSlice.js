import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetch_Prom } from '../js/api';

const initialState = {
  orders: [],
  imp_Orders: 0,
  errMsg: '',
  status: 'idle',
};

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async ({queryUrl, isReload}, {getState, rejectWithValue}) => {
    const response = await fetch_Prom('/Orders?'+queryUrl);
    if(response.status === 200) {
      const objs = isReload?response.data.objects : [...getState().order.orders, ...response.data.objects];
      return objs;
    } else {
      return rejectWithValue('my error info');
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: { },
  extraReducers: {
    [getOrders.pending]: (state) => { state.status = 'loading'; },
    [getOrders.fulfilled]: (state, action) => { 
      state.status = 'succeed';
      state.orders  = action.payload;
      let imps = 0
      action.payload.forEach(item =>  imps += item.imp);
      state.imp_Orders = imps.toFixed(2);
    },
    [getOrders.rejected]: (state, action) => { state.status = 'Error'; state.errMsg = action.error.message; }
  }
});

export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;
