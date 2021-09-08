import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from 'react-intl'; 
import { useSelector, useDispatch } from 'react-redux';

import {selectObjects, getObjects} from '../../../features/dbsSlice'
import {selectQuery, selectQueryStr, setQuery} from '../../../features/querySlice'

import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import UiVariety from "../../../components/ui/UiVariety";
import PdCard from "../../../components/ui/pd/PdCart";
import PdRow from "../../../components/ui/pd/PdRow";

export default function Pds(props) {
  const api = '/Pds';
  const rolePath = getRolePath();
  const hist = useHistory();
  const dispatch = useDispatch();
  
  const query = useSelector(selectQuery(api));
  const queryStr = useSelector(selectQueryStr(api));
  const objects = useSelector(selectObjects(api));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/pd/${obj._id}`)
  }

  useEffect(() => {
    dispatch(getObjects({api, queryStr: queryStr, isReload: true}));
  }, [dispatch, queryStr]);

  return (
    <>
      <div>test</div>
      <NavBread  activePage={<FormattedMessage id='navLabel-pds' defaultMessage='Products'/>}></NavBread>
      <input type="text"  className="form-control" onChange={(e)=> dispatch(setQuery({api,key: 'search', val: e.target.value}))} value={query?.search || ''} />
      <div className="mt-4">
        <UiVariety UiCard={PdCard} UiRow={PdRow} objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
