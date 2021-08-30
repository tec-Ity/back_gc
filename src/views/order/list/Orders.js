import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectOrders, getOrders} from '../../../features/orderSlice'

export default function Orders() {
        const orders = useSelector(selectOrders);
        const status = useSelector(state => state.order.status);
        const imp_Orders = useSelector(state => state.order.imp_Orders);
        const dispatch = useDispatch();
        const populateObjs = [{path: 'Client', select: 'code nome phone'}, {path: 'Shop', select: 'code nome'}]
        useEffect(() => {
                if(status === 'idle') {
                        dispatch(getOrders({queryUrl: 'populateObjs='+JSON.stringify(populateObjs), isReload: false}));
                }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch, status])
        return (<>
                {
                        orders.map(order => { return(
                                <div key={order._id} className="row py-3 my-2 border rounded">
                                        <div className="col-6 col-md-4 mt-2   ">{order.code} </div>
                                        <div className="col-3 col-md-2 mt-2   ">{order.Shop.code} </div>
                                        <div className="col-3 col-md-4 mt-2 d-none d-md-block  ">{order.Client.code} </div>
                                        <div className="col-3 col-md-2 mt-2   ">{order.imp} </div>
                                </div>
                        )})
                }
                <h3>{imp_Orders}</h3>
        </>)
}
