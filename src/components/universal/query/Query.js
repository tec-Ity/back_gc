import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectQuery, selectQueryStr, setQuery, getObjects, unObjectsSlice} from '../../../features/objectsSlice'

export default function Query(props) {
        const {flagSlice, api, initQuery, fixedQuery, matchSearchCode} = props;
        const dispatch = useDispatch();
        const query = useSelector(selectQuery(flagSlice));
        const queryStr = useSelector(selectQueryStr(flagSlice));

        const onChangeSearch = () => (e) =>{
                const val = e.target.value;
                dispatch( setQuery({ flagSlice, query: {key: 'search', val}, fixedQuery }) )
                if(matchSearchCode) matchSearchCode(val);
        }
        console.log('queryStr', queryStr)
        // 根据父组件 initQuery 的变化 及时更新 recucer 中的 filter
        useEffect(() => {
                if(initQuery ) {
                        if( initQuery.key && initQuery.val) {
                                dispatch(setQuery({flagSlice, query: initQuery, fixedQuery}));
                        }else {
                                console.log(`parameter Error: initQuery error `);
                        }
                }
                dispatch(setQuery({flagSlice, fixedQuery}));
              // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [initQuery]);

        // 根据本身 filter 的变化更新 reducer 中对应查找的数据
        useEffect(() => {
                dispatch(getObjects({flagSlice, api, queryStr, isReload: true}));
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
