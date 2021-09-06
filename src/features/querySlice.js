import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: {search: ''},
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
        setQuery: (state, action) => {
          state.query = {...state.query, [action.payload.key]: action.payload.val}
        },

        unmountQuery: (state) => {
          const query = state.query;
          Object.keys(query).forEach(key => {
            query[key] = ''; 
          } );
          state.query = query;
        },
   },
  extraReducers: {
  }
});

export const { unmountQuery, setQuery } = querySlice.actions;

export const selectQuery = (state) => state.query.query;
export const selectQueryStr = (state) => {
  const query = state.query.query;
  const filters = [];
    Object.keys(query).forEach(key => {
      if(query[key] !== '' || query[key] !== undefined || query[key] !== null){
        filters.push(`${key}=${query[key]}`);
      } 
    } );
    if(filters.join('&')) {
      return `?${filters.join('&')}`;
    } else {
      return '';
    }
}

export default querySlice.reducer;
