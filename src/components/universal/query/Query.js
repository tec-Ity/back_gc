import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectQuery, setQuery, unmountQuery} from '../../../features/querySlice'

export default function Query() {
        const dispatch = useDispatch();
        const query = useSelector(selectQuery);

        useEffect(() => { return () => {
                dispatch(unmountQuery());
                // setObjs([]);
        } }, [dispatch]);
        return (
                <div>
                        <input 
                                type="text"  className="form-control" 
                                onChange={(e)=> dispatch(setQuery({key: 'search', val: e.target.value}))} value={query.search} 
                        />
                </div>
        )
}
