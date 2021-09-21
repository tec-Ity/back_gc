import React from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../../../features/objectsSlice";
export default function SearchInput() {
    const dispatch = useDispatch()
  const onChangeSearch = () => (e) => {
    const val = e.target.value;
    dispatch(setQuery({ flagSlice, query: { key: "search", val } }));
    if (matchSearchCode) matchSearchCode(val);
  };
  return (
    <input
      type='text'
      className='form-control'
      onChange={onChangeSearch()}
      value={query?.search || ""}
    />
  );
}
