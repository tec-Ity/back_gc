import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectQuery, selectQueryStr, setQuery, getObjects, unObjectsSlice} from '../../../features/objectsSlice';

export default function Query(props) {
        const {flagSlice, api, initQuery, populateStr, matchSearchCode} = props;
        const dispatch = useDispatch();
        const query = useSelector(selectQuery(flagSlice));
        const queryStr = useSelector(selectQueryStr(flagSlice));

        const onChangeSearch = () => (e) =>{
                const val = e.target.value;
                dispatch( setQuery({ flagSlice, query: {key: 'search', val} }) )
                if(matchSearchCode) matchSearchCode(val);
        }
        // 根据父组件 initQuery 的变化 及时更新 recucer 中的 filter
        useEffect(() => {
                if(initQuery ) {
                        if( initQuery.key && initQuery.val) {
                                dispatch(setQuery({flagSlice, query: initQuery}));
                        }else {
                                console.log(`parameter Error: initQuery error `);
                        }
                }
              // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [initQuery]);

        // 根据本身 filter 的变化更新 reducer 中对应查找的数据
        useEffect(() => {
                let querystr = queryStr;
                if(populateStr) querystr+=populateStr
                dispatch(getObjects({flagSlice, api, queryStr:querystr, isReload: true}));
              // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryStr]);
        useEffect(() => {
                return () => {
                        dispatch(unObjectsSlice(flagSlice))
                }
        }, [dispatch, flagSlice])

        return (
                <div>
                        <input
                                type="text"  className="form-control"
                                onChange={onChangeSearch()} 
                                value={query?.search || '' }
                        />
                </div>
        )
}