import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectQuery, selectQueryStr, setQuery, getObjects} from '../../../features/objectsSlice'

export default function Query(props) {
        const {flagSlice, api} = props;
        const dispatch = useDispatch();
        const query = useSelector(selectQuery(flagSlice));
        const queryStr = useSelector(selectQueryStr(flagSlice));

        useEffect(() => {
                dispatch(getObjects({flagSlice, api, queryStr, isReload: true}));
              // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryStr]);

        return (
                <div>
                        <input
                                type="text"  className="form-control"
                                onChange={(e)=> dispatch( setQuery({ flagSlice, api, query: {key: 'search', val: e.target.value} }) ) } 
                                value={query?.search || '' }
                        />
                </div>
        )
}
