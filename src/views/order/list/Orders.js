import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchInput from "../../../components/universal/query/SearchInput";
import { selectObjects, setQueryFixed } from "../../../features/objectsSlice";

export default function Orders() {
  const dispatch = useDispatch()
  const flagSlice = "orders";
  const api = "/Orders";
  const populateObjs = [
    { path: "Client", select: "code nome phone" },
    { path: "Shop", select: "code nome" },
  ];
  const queryFixed = "&populateObjs=" + JSON.stringify(populateObjs);
  // 先把queryFixed设置好
  useEffect(() => {
    dispatch(setQueryFixed({ flagSlice, queryFixed }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const objects = useSelector(selectObjects(flagSlice));

  let imp_Orders = 0;
  // console.log(api+queryApi)
  return (
    <>
      <SearchInput
        flagSlice={flagSlice}
        api={api}
      />
      {objects.map((order) => {
        imp_Orders += order.imp || 0;
        return (
          <div key={order._id} className='row py-3 my-2 border rounded'>
            <div className='col-6 col-md-4 mt-2   '>{order.code} </div>
            <div className='col-3 col-md-2 mt-2   '>{order.Shop?.code} </div>
            <div className='col-3 col-md-4 mt-2 d-none d-md-block  '>
              {order.Client?.code}{" "}
            </div>
            <div className='col-3 col-md-2 mt-2   '>
              {order.imp?.toFixed(2)}{" "}
            </div>
          </div>
        );
      })}
      <h3>{imp_Orders.toFixed(2)}</h3>
    </>
  );
}
