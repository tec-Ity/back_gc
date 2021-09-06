import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetch_Prom } from '../js/api';

const initialState = {
        objects: [],
        errMsg: '',
        status: 'idle',
};

export const getObjects = createAsyncThunk(
  'db/getObjects',
  async ({api, isReload}, {getState, rejectWithValue}) => {
    const response = await fetch_Prom(api);
    if(response.status === 200) {
      const payload = isReload?response.data.objects : [...getState().db.objects, ...response.data.objects];
      return payload;
    } else {
      return rejectWithValue('my error info');
    }
  }
);

export const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
        postObject: (state, action) => {
                state.objects = [action.payload, ...state.objects];
        },

        unmountDB: (state) => {
                state = initialState;
                console.log(state)
        },
},
  extraReducers: {
    [getObjects.pending]: (state) => { state.status = 'loading'; },
    [getObjects.fulfilled]: (state, action) => { 
      state.status = 'succeed';
      state.objects  = action.payload;
    },
    [getObjects.rejected]: (state, action) => { state.status = 'Error'; state.errMsg = action.error.message; }
  }
});
export const {postObject, unmountDB} = dbSlice.actions;
export const selectObjects = (state) => state.db.objects;

export default dbSlice.reducer;
