import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetch_Prom } from '../js/api';

const initialState = {
  errMsg: '',
  status: 'idle',
};

export const getObjects = createAsyncThunk(
  'dbs/getObjects',
  async ({api, queryStr, isReload}, {getState, rejectWithValue}) => {
    const dbs_res = await fetch_Prom(api+'?'+queryStr);
    if(dbs_res.status === 200) {
      const apiSlice = getState().dbs[api]?.objects || [];
      const objects = isReload?dbs_res.data.objects : [...apiSlice, ...dbs_res.data.objects];
      return {api, objects};
    } else {
      return rejectWithValue('my error info');
      // return rejectWithValue({api, info:'my error info'});
    }
  }
);

export const dbsSlice = createSlice({
  name: 'dbs',
  initialState,
  reducers: {
        postObject: (state, action) => {
            const {api, obj} = action.payload;
            if(!state[api]) state[api] = {};
            state[api].objects.unshift(obj);
        },

        unmountDB: (state, action) => {
            const {api} = action.payload;
            delete state[api];
        },
},
  extraReducers: {
    [getObjects.pending]: (state) => {
      state.status = 'loading'; 
    },
    [getObjects.fulfilled]: (state, action) => { 
      const {api, objects} = action.payload;
      state.status = 'succeed';
      if(!state[api]) state[api] = {};
      state[api].objects  = objects;
    },
    [getObjects.rejected]: (state, action) => {
      state.errMsg = action.error.message;
    }
  }
});

export const {postObject, unmountDB} = dbsSlice.actions;
export const selectObjects = (api) => (state) => {
  if(state.dbs[api]) {
      return state.dbs[api].objects
  } else {
    return [];
  }
}

export default dbsSlice.reducer;
