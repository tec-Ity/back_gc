import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { getObjs_Prom } from "../../../js/api";
import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import UiVariety from "../../../components/ui/UiVariety";
import PdCard from "../../../components/ui/pd/PdCart";
import PdRow from "../../../components/ui/pd/PdRow";

export default function Pds(props) {
  const rolePath = getRolePath();
  const hist = useHistory();
  const api = "/Pds";
  const [objects, setObjects] = useState([]);
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/pd/${obj._id}`)
  }
  const pdsCall = useCallback(() => {
    getObjs_Prom(api, objects, setObjects, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    pdsCall();
    return () => setObjects([]);
  }, [pdsCall]);

  return (
    <>
      <NavBread  activePage="Pds"></NavBread>
      <div>
        <UiVariety UiCard={PdCard} UiRow={PdRow} objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
