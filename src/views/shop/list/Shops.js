import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { getObjs_Prom } from "../../../js/api";
import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/NavBread";

import UiVariety from "../../../components/ui/UiVariety";
import ShopCard from "../../../components/ui/shop/ShopCart";
import ShopRow from "../../../components/ui/shop/ShopRow";

export default function Shops(props) {
  const rolePath = getRolePath();
  const hist = useHistory();
  const api = "/Shops";
  const [Objs, setObjs] = useState([]);
  const clickEvent = (object) => (e) => {
    hist.push(`/${rolePath}/shop/${object._id}`)
  }
  const shopsCall = useCallback(() => {
    getObjs_Prom(api, Objs, setObjs, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    shopsCall();
    return () => setObjs([]);
  }, [shopsCall]);

  return (
    <>
      <NavBread  activePage="Shops"></NavBread>
      <div>
        <UiVariety UiCard={ShopCard} UiRow={ShopRow} Objs={Objs} clickEvent={clickEvent} />
      </div>
    </>
  );
}
