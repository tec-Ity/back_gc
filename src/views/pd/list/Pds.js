import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { getObjs_Prom } from "../../../js/api";
import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/NavBread";

import UiVariety from "../../../components/ui/UiVariety";
import PdCard from "../../../components/ui/pd/PdCart";
import PdRow from "../../../components/ui/pd/PdRow";

export default function Pds(props) {
  const rolePath = getRolePath();
  const hist = useHistory();
  const api = "/Pds";
  const [Objs, setObjs] = useState([]);
  const clickEvent = (object) => (e) => {
    hist.push(`/${rolePath}/pd/${object._id}`)
  }
  const pdsCall = useCallback(() => {
    getObjs_Prom(api, Objs, setObjs, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    pdsCall();
    return () => setObjs([]);
  }, [pdsCall]);

  return (
    <>
      <NavBread  activePage="Pds"></NavBread>
      <div>
        <UiVariety UiCard={PdCard} UiRow={PdRow} Objs={Objs} clickEvent={clickEvent} />
      </div>
    </>
  );
}
