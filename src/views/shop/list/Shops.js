import React, { useState, useEffect, useCallback } from "react";
import { getObjs_Prom } from "../../../js/api";

import NavBread from "../../../components/NavBread";

import UiVariety from "../../../components/UiVariety";
import ShopUiRow from "./ShopUiRow";
import ShopUiCard from "./ShopUiCard";
export default function Shops(props) {
  const api = "/Shops";
  const [Objects, setObjects] = useState([]);

  const shopsCall = useCallback(() => {
    getObjs_Prom(api, Objects, setObjects, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    shopsCall();
    return () => setObjects([]);
  }, [shopsCall]);

  return (
    <>
      <NavBread  activePage="Shops"></NavBread>
      <div>
        <UiVariety UiRow={ShopUiRow} UiCard={ShopUiCard} Objects={Objects} />
      </div>
    </>
  );
}
