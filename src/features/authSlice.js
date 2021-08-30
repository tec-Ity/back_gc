import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetch_Prom } from '../js/api';

const initialState = {
  accessToken: '',
  curUser: {},
  errMsg: '',
  status: 'idle',
};

export const login = createAsyncThunk(
  'auth/login', async ({rejectWithValue}) => {
    const response = await fetch_Prom('/login');
    if(response.status === 200) { return response.data; }
     else { return rejectWithValue('my error info'); }
} );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
  extraReducers: {
    [login.pending]: (state) => { state.status = 'loading'; },
    [login.fulfilled]: (state, action) => { 
      state.status = 'succeed';
      state.accessToken  = action.payload.accessToken;
      state.curUser  = action.payload.curUser;
    },
    [login.rejected]: (state, action) => { state.status = 'Error'; state.errMsg = action.error.message; }
  }
});

export const selectOrders = (state) => state.auth.orders;

export default authSlice.reducer;
