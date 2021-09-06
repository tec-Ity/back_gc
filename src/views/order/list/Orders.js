import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectObjects, getObjects, unmountDB} from '../../../features/dbSlice'

export default function Orders() {
        const objects = useSelector(selectObjects);
        const dispatch = useDispatch();
        const populateObjs = [{path: 'Client', select: 'code nome phone'}, {path: 'Shop', select: 'code nome'}];
        const api = '/Orders?populateObjs='+JSON.stringify(populateObjs);
        useEffect(() => {
                dispatch(getObjects({api, isReload: true}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch])
        useEffect(() => {
                return () => {
                        console.log("Order un")
                        dispatch(unmountDB());
                }
        }, [dispatch])
        let imp_Orders = 0;
        console.log("Orders", objects)
        return (<>
                {
                        objects.map(order => { 
                                imp_Orders += order.imp
                                return(
                                        <div key={order._id} className="row py-3 my-2 border rounded">
                                                <div className="col-6 col-md-4 mt-2   ">{order.code} </div>
                                                <div className="col-3 col-md-2 mt-2   ">{order.Shop.code} </div>
                                                <div className="col-3 col-md-4 mt-2 d-none d-md-block  ">{order.Client.code} </div>
                                                <div className="col-3 col-md-2 mt-2   ">{order.imp.toFixed(2)} </div>
                                        </div>
                                )}
                        )
                }
                <h3>{imp_Orders.toFixed(2)}</h3>
        </>)
}
