import  { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";

import { getRolePath } from "../../../js/conf/confUser";
import { getObjs_Prom } from "../../../js/api";
import { getLang } from "../../../js/lang/language";

import UiVariety from "../../../components/ui/UiVariety";
import UserCard from "../../../components/ui/user/UserCart";
import UserRow from "../../../components/ui/user/UserRow";

import UserPostModal from "../../../modal/user/UserPostModal";
import NavBread from "../../../components/NavBread";

export default function Users(props) {
  const hist = useHistory();
  const rolePath = getRolePath();
  const apiUsers = "/Users";
  const getApiFilter = (apifilter) => {
    const filters = [];
    Object.keys(apifilter).forEach(key => {
      if(apifilter[key]){
        if(key === 'search') {
          filters.push(`${key}=${apifilter[key].toUpperCase()}`)
        } else {
          filters.push(`${key}=${apifilter[key]}`);
        }
      } 
    } );
    if(filters.join('&')) {
      return `?${filters.join('&')}`;
    } else {
      return '';
    }
  }

  const [apiFilter, setApiFilter] = useState({
    search: ''
  });
  const iptFilter = (type) => (e) => {
    const curFilter = {...apiFilter, [type]: e.target.value};
    setApiFilter(curFilter);
    console.log(apiUsers+getApiFilter(curFilter))
    getObjs_Prom(apiUsers+getApiFilter(curFilter), Objs, setObjs, true);
  }
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
    getObjs_Prom(apiUsers+getApiFilter(apiFilter), Objs, setObjs, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    usersCall();
    return () => setObjs([]);
  }, [usersCall]);

  return (
    <>
      <NavBread  activePage={getLang('navLabel').users}></NavBread>
      <input type="text"  onChange={iptFilter('search')} value={apiFilter.search} />
      <div className="text-right">
        <button className="btn btn-info" onClick={() => setModalShow(true)}> + </button>
        <UserPostModal show={modalShow} onHide={() => setModalShow(false)} saveSuccess={saveSuccess}/>
      </div>

      <hr></hr>
      <UiVariety UiCard={UserCard} UiRow={UserRow} Objs={Objs} clickEvent={clickCardEvent} />
    </>
  );
}
