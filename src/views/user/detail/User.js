import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router';
import { FormattedMessage } from 'react-intl'; 
import { useSelector, useDispatch } from 'react-redux';

import { fetch_Prom } from '../../../js/api';
import  {getRolePath} from '../../../js/conf/confUser';

import UserPutModal from "../../../modal/user/UserPutModal";
import NavBread from '../../../components/universal/navBread/NavBread';

import { selectUser } from '../../../features/authSlice';
import {getObject, selectObject} from '../../../features/objectsSlice';

export default function User() {
  const hist = useHistory();
  const dispatch = useDispatch();

  const flagSlice = 'user';
  const {id} = useParams();
  const api = `/user/${id}`;

  const rolePath = getRolePath();

  const curUser = useSelector(selectUser);
  const object = useSelector(selectObject(flagSlice));

    const [modalShow, setModalShow] = useState(false);

    const deleteDB = async() => {
      const del_res = await fetch_Prom('/UserDelete/'+id, 'DELETE' )
      if(del_res.status === 200) {
          hist.replace(`/${rolePath}/users`);
      } else {
        console.log(del_res.message)
      }
    }

    useEffect(() => {
      dispatch(getObject({flagSlice, api}))

    }, [api, dispatch])
    return (<>
        <NavBread activePage={<FormattedMessage id='navLabel-user' defaultMessage='user' />}>
            <Link to={`/${rolePath}/users`}><FormattedMessage id='navLabel-users' defaultMessage='users' /></Link>
        </NavBread>
        {
          object._id && (
            <div className="text-right">
              {
                curUser._id !== object._id &&
                <button className="btn btn-danger mx-4" onClick={deleteDB}> <i className='bx bx-trash'></i> </button>
              }
              <button className="btn btn-info" onClick={() => setModalShow(true)}> <i className='bx bx-edit-alt'></i> </button>
              <UserPutModal show={modalShow} onHide={() => setModalShow(false)} object={object} />
            </div>
          )
        }

        <div className="row">
          <div className="col-4 col-md-2"> _id: </div> <div className="col-8 col-md-10"> {object._id} </div>
          <div className="col-4 col-md-2"> code: </div> <div className="col-8 col-md-10"> {object.code} </div>
          <div className="col-4 col-md-2"> nome: </div> <div className="col-8 col-md-10"> {object.nome} </div>
          <div className="col-4 col-md-2"> phonePre: </div> <div className="col-8 col-md-10"> {object.phonePre} </div>
          <div className="col-4 col-md-2"> phone: </div> <div className="col-8 col-md-10"> {object.phone} </div>
          <div className="col-4 col-md-2"> role: </div> <div className="col-8 col-md-10"> {object.role} </div>
          <div className="col-4 col-md-2"> is_blacklist: </div> <div className="col-8 col-md-10"> {object.is_blacklist} </div>
          <div className="col-4 col-md-2"> is_shelf: </div> <div className="col-8 col-md-10"> {object.is_shelf} </div>
          <div className="col-4 col-md-2"> is_usable: </div> <div className="col-8 col-md-10"> {object.is_usable} </div>
          <div className="col-4 col-md-2"> at_last_login: </div> <div className="col-8 col-md-10"> {object.at_last_login} </div>
          {object.Firm && <><div className="col-4 col-md-2"> Firm: </div> <div className="col-8 col-md-10"> {object.Firm.code} </div></>}
          {object.Shop && <><div className="col-4 col-md-2"> Shop: </div> <div className="col-8 col-md-10"> {object.Shop.code} </div></>}
        </div>
    </>)
}
