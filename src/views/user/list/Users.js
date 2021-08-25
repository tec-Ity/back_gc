import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";

import { getRole } from "../../../js/conf/confUser";
import { getObjs_Prom } from "../../../js/api";

import UiVariety from "../../../components/ui/UiVariety";
import UserCard from "../../../components/ui/user/UserCart";
import UserRow from "../../../components/ui/user/UserRow";

import UserAddModal from "../../../modal/user/UserAddModal";
import NavBread from "../../../components/NavBread";

export default function Users(props) {
  const hist = useHistory();
  const role = getRole();
  const apiUsers = "/Users";
  
  const [Objs, setObjs] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const saveSuccess = (object) => {
    const nxtUser = [object, ...Objs]
    setObjs(nxtUser);
  }

  const clickCardEvent = (object) => (e) => {
    hist.push(`/${role.val}/user/${object._id}`)
  }

  const usersCall = useCallback(() => {
    getObjs_Prom(apiUsers, Objs, setObjs, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    usersCall();
    return () => setObjs([]);
  }, [usersCall]);

  return (
    <>
      <NavBread  activePage="Users"></NavBread>

      <div className="text-right">
        <button className="btn btn-info" onClick={() => setModalShow(true)}> + </button>
        <UserAddModal show={modalShow} onHide={() => setModalShow(false)} saveSuccess={saveSuccess}/>
      </div>

      <UiVariety UiCard={UserCard} UiRow={UserRow} Objs={Objs} clickEvent={clickCardEvent} />
    </>
  );
}
