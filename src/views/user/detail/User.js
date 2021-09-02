import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/authSlice';

import { getObj_Prom, fetch_Prom } from '../../../js/api';
import  {getRolePath} from '../../../js/conf/confUser';
import { getLang } from '../../../js/lang/language';

import UserPutModal from "../../../modal/user/UserPutModal";

import NavBread from '../../../components/NavBread';

export default function User() {
  const hist = useHistory();
  const curUser = useSelector(selectUser);

    const {id} = useParams();
    const apiUser = `/user/${id}`;
    const rolePath = getRolePath();
    const [Obj, setObj] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const saveSuccess = (object) => {
      getObj_Prom(apiUser, setObj);
    }
    const deleteDB = async() => {
      const del_res = await fetch_Prom('/UserDelete/'+id, 'DELETE' )
      if(del_res.status === 200) {
          hist.replace(`/${rolePath}/users`);
      } else {
        console.log(del_res.message)
      }
    }
    const usersCall = useCallback(() => {
      getObj_Prom(apiUser, setObj);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        usersCall();
        return () => setObj([]);
      }, [usersCall]);
    return (<>
        <NavBread activePage={getLang('navLabel').user}>
            <Link to={`/${rolePath}/users`}>{getLang('navLabel').users}</Link>
        </NavBread>
        {
          Obj._id && (
            <div className="text-right">
              {
                curUser._id !== Obj._id &&
                <button className="btn btn-danger mx-4" onClick={deleteDB}> <i className='bx bx-trash'></i> </button>
              }
              <button className="btn btn-info" onClick={() => setModalShow(true)}> <i className='bx bx-edit-alt'></i> </button>
              <UserPutModal show={modalShow} onHide={() => setModalShow(false)} Obj={Obj} saveSuccess={saveSuccess}/>
            </div>
          )
        }

        <div className="row">
          <div className="col-4 col-md-2"> _id: </div> <div className="col-8 col-md-10"> {Obj._id} </div>
          <div className="col-4 col-md-2"> code: </div> <div className="col-8 col-md-10"> {Obj.code} </div>
          <div className="col-4 col-md-2"> nome: </div> <div className="col-8 col-md-10"> {Obj.nome} </div>
          <div className="col-4 col-md-2"> phonePre: </div> <div className="col-8 col-md-10"> {Obj.phonePre} </div>
          <div className="col-4 col-md-2"> phone: </div> <div className="col-8 col-md-10"> {Obj.phone} </div>
          <div className="col-4 col-md-2"> role: </div> <div className="col-8 col-md-10"> {Obj.role} </div>
          <div className="col-4 col-md-2"> is_blacklist: </div> <div className="col-8 col-md-10"> {Obj.is_blacklist} </div>
          <div className="col-4 col-md-2"> is_shelf: </div> <div className="col-8 col-md-10"> {Obj.is_shelf} </div>
          <div className="col-4 col-md-2"> is_usable: </div> <div className="col-8 col-md-10"> {Obj.is_usable} </div>
          <div className="col-4 col-md-2"> at_last_login: </div> <div className="col-8 col-md-10"> {Obj.at_last_login} </div>
          {Obj.Firm && <><div className="col-4 col-md-2"> Firm: </div> <div className="col-8 col-md-10"> {Obj.Firm.code} </div></>}
          {Obj.Shop && <><div className="col-4 col-md-2"> Shop: </div> <div className="col-8 col-md-10"> {Obj.Shop.code} </div></>}
        </div>
    </>)
}
