import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {selectObjects, getObjects} from '../../../features/dbsSlice'
import {selectQuery, selectQueryStr, setQuery} from '../../../features/querySlice'

export default function Orders() {
        const api = '/Orders';
        const populateObjs = [{path: 'Client', select: 'code nome phone'}, {path: 'Shop', select: 'code nome'}];
        const popStr = '&populateObjs='+JSON.stringify(populateObjs);
        const dispatch = useDispatch();

        const query = useSelector(selectQuery(api));
        const queryStr = useSelector(selectQueryStr(api));
        const objects = useSelector(selectObjects(api));
        useEffect(() => {
                dispatch(getObjects({api, queryStr: queryStr+popStr, isReload: true}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryStr, dispatch])

        let imp_Orders = 0;
        return (<>
                <input type="text"  className="form-control" onChange={(e)=> dispatch(setQuery({api,key: 'search', val: e.target.value}))} value={query?.search || ''} />
                {
                        objects.map(order => { 
                                imp_Orders += order.imp || 0;
                                return(
                                        <div key={order._id} className="row py-3 my-2 border rounded">
                                                <div className="col-6 col-md-4 mt-2   ">{order.code} </div>
                                                <div className="col-3 col-md-2 mt-2   ">{order.Shop?.code} </div>
                                                <div className="col-3 col-md-4 mt-2 d-none d-md-block  ">{order.Client?.code} </div>
                                                <div className="col-3 col-md-2 mt-2   ">{order.imp?.toFixed(2)} </div>
                                        </div>
                                )}
                        )
                }
                <h3>{imp_Orders.toFixed(2)}</h3>
        </>)
}
