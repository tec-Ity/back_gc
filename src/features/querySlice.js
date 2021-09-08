import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'query',
  initialState: {},
  reducers: {
        setQuery: (state, action) => {
          const {api, key, val} = action.payload;
          if(!state[api]) state[api] = {};
          state[api] = {...state[api], [key]: val}
        },
        cleanQuery: (state, action) => {
          const {api} = action.payload;
          state[api] = {};
        },
   },
  extraReducers: {
  }
});

export const { cleanQuery, setQuery } = querySlice.actions;

export const selectQuery = (api) =>  (state) => state.query[api];

export const selectQueryStr = (api) =>  (state) => {
  const query = state.query[api] || {};
  const filters = [];
    Object.keys(query).forEach(key => {
      if(query[key] !== '' || query[key] !== undefined || query[key] !== null){
        filters.push(`${key}=${query[key]}`);
      } 
    } );
    if(filters.join('&')) {
      return `&${filters.join('&')}`;
    } else {
      return '&';
    }
}

export default querySlice.reducer;
