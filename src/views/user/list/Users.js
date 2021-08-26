import  { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";

import { getRolePath } from "../../../js/conf/confUser";
import { getObjs_Prom } from "../../../js/api";
import { getLang } from "../../../js/lang/frontLang";

import UiVariety from "../../../components/ui/UiVariety";
import UserCard from "../../../components/ui/user/UserCart";
import UserRow from "../../../components/ui/user/UserRow";

import UserPostModal from "../../../modal/user/UserPostModal";
import NavBread from "../../../components/NavBread";

export default function Users(props) {
  const hist = useHistory();
  const rolePath = getRolePath();
  const apiUsers = "/Users";
  
  const [Objs, setObjs] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const saveSuccess = (object) => {
    const nxtUser = [object, ...Objs]
    setObjs(nxtUser);
  }

  const clickCardEvent = (object) => (e) => {
    hist.push(`/${rolePath}/user/${object._id}`)
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
      <NavBread  activePage={getLang('navLabel').users}></NavBread>

      <div className="text-right">
        <button className="btn btn-info" onClick={() => setModalShow(true)}> + </button>
        <UserPostModal show={modalShow} onHide={() => setModalShow(false)} saveSuccess={saveSuccess}/>
      </div>

      <UiVariety UiCard={UserCard} UiRow={UserRow} Objs={Objs} clickEvent={clickCardEvent} />
    </>
  );
}
