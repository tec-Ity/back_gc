import  { useState,  lazy } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from 'react-intl'; 
import { useSelector } from 'react-redux';

import { getRolePath } from "../../../js/conf/confUser";

import NavBread from "../../../components/universal/navBread/NavBread";
import UiVariety from "../../../components/ui/UiVariety";
import UserCard from "../../../components/ui/user/UserCart";
import UserRow from "../../../components/ui/user/UserRow";
import Query from "../../../components/universal/query/Query";

import {selectObjects} from '../../../features/objectsSlice';

const UserPostModal = lazy(() => import( "../../../modal/user/UserPostModal"));
export default function Users(props) {
  const flagSlice = 'user';
  const api = '/Users';
  const hist = useHistory();
  const rolePath = getRolePath();
  
  const objects = useSelector(selectObjects(flagSlice));
  const [modalShow, setModalShow] = useState(false);

  const clickCardEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/user/${obj._id}`)
  }

  return (
    <>
      <NavBread  activePage={<FormattedMessage id='navLabel-users' defaultMessage='users'/>}></NavBread>

      <div className="text-right mb-3">
        <button className="btn btn-info" onClick={() => setModalShow(true)}> + </button>
        <UserPostModal 
          flagSlice={flagSlice}
          show={modalShow}
          onHide={() => setModalShow(false)}
          />
      </div>
      <Query api={api} flagSlice={flagSlice} />

      <hr/>
      <UiVariety UiCard={UserCard} UiRow={UserRow} objects={objects} clickEvent={clickCardEvent} />
    </>
  );
}
