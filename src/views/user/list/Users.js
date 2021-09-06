import  { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from 'react-intl'; 
import { useSelector, useDispatch } from 'react-redux';

import {selectObjects, getObjects, postObject, unmountDB} from '../../../features/dbSlice'
import {selectQuery, selectQueryStr, setQuery, unmountQuery} from '../../../features/querySlice'

import { getRolePath } from "../../../js/conf/confUser";

import UiVariety from "../../../components/ui/UiVariety";
import UserCard from "../../../components/ui/user/UserCart";
import UserRow from "../../../components/ui/user/UserRow";

import UserPostModal from "../../../modal/user/UserPostModal";
import NavBread from "../../../components/universal/navBread/NavBread";

export default function Users(props) {
  const hist = useHistory();
  const dispatch = useDispatch();
  const rolePath = getRolePath();

  const query = useSelector(selectQuery);
  const queryStr = useSelector(selectQueryStr);

  const objects = useSelector(selectObjects);
  const [modalShow, setModalShow] = useState(false);

  const clickCardEvent = (object) => (e) => {
    hist.push(`/${rolePath}/user/${object._id}`)
  }

  useEffect(() => {
    dispatch(getObjects({api: '/Users'+queryStr, isReload: true}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStr]);
  // componentDidUnmount
  console.log('render')
  useEffect(() => { 
    console.log('will mount')
    return () => {
    console.log("user un")
      dispatch(unmountQuery())
      dispatch(unmountDB());
  } }, [dispatch]);
  console.log("Users", objects)
  return (
    <>
      <NavBread  activePage={<FormattedMessage id='navLabel-users' defaultMessage='users'/>}></NavBread>

      <div className="text-right mb-3">
        <button className="btn btn-info" onClick={() => setModalShow(true)}> + </button>
        <UserPostModal 
          show={modalShow}
          onHide={() => setModalShow(false)}
          saveSuccess={ (object) =>  dispatch(postObject(object))}
          />
      </div>
      <input type="text"  className="form-control" onChange={(e)=> dispatch(setQuery({key: 'search', val: e.target.value}))} value={query.search} />

      <hr/>
      <UiVariety UiCard={UserCard} UiRow={UserRow} objects={objects} clickEvent={clickCardEvent} />
    </>
  );
}
