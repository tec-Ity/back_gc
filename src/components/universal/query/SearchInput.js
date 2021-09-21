import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearch,
  selectSearch,
  selectQueryStr,
  getObjects,
  unObjectsSlice,
} from "../../../features/objectsSlice";

export default function SearchInput(props) {
  const { flagSlice, api, farSearch, matchSearchCode } = props;
  const dispatch = useDispatch();
  const search = useSelector(selectSearch(flagSlice));
  const queryStr = useSelector(selectQueryStr(flagSlice));

  const onChangeSearch = () => (e) => {
    const val = e.target.value;
    dispatch( setSearch({ flagSlice, search: val } ) );
    // 如果找到完全匹配的code
    if (matchSearchCode) matchSearchCode(val);
  };



  // 根据本身 filter 的变化, 更新 reducer 中对应查找的数据 (如果加载此组件， 则不用在父组件中加载)
    useEffect(() => {
      dispatch( getObjects({ flagSlice, api, queryStr, isReload: true }) );
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // 根据父组件 farSearch 的变化 及时更新 recucer 中的 filter, (比如点击卡片 search input 会变为 obj.code)
  useEffect(() => {
    if (farSearch) {
      if (farSearch.key && farSearch.val) {
        dispatch(setSearch({ flagSlice, search: farSearch }));
      } else {
        console.log(`parameter Error: farSearch error `);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farSearch]);

  // 卸载
  useEffect(() => {
    return () => {
      dispatch(unObjectsSlice(flagSlice));
    };
  }, [dispatch, flagSlice]);

  return (
    <div>
      <input
        type='text'
        className='form-control'
        onChange={onChangeSearch()}
        value={search}
      />
    </div>
  );
}
