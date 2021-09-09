// import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import Query from "../../../components/universal/query/Query";

import {selectObjects} from '../../../features/objectsSlice'

export default function Orders() {
        const flagSlice = 'orders';
        const api = '/Orders';
        const fixedQuery = {
                populateObjs: [{path: 'Client', select: 'code nome phone'}, {path: 'Shop', select: 'code nome'}]
        };
        const popStr = '&populateObjs='+JSON.stringify(fixedQuery.populateObjs);
        console.log('Orders', popStr)
        // const dispatch = useDispatch();

        // const queryStr = useSelector(selectQueryStr(flagSlice));
        const objects = useSelector(selectObjects(flagSlice));
        // useEffect(() => {
        //         dispatch(getObjects({flagSlice, api, queryStr: queryStr+popStr, isReload: true}));
        // // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [queryStr, dispatch])

        let imp_Orders = 0;
        return (<>
                <Query api={api} flagSlice={flagSlice} fixedQuery={fixedQuery} />
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
