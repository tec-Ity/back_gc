import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

import { getObj_Prom } from '../../../js/api';
import  {getRole} from '../../../js/conf/confUser';

import NavBread from '../../../components/NavBread'

export default function User() {
    const {id} = useParams();
    const apiUser = `/user/${id}`;
    const role = getRole();
    const [Obj, setObj] = useState({});
    // console.log("Obj:", Obj)

    const usersCall = useCallback(() => {
        getObj_Prom(apiUser, setObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      useEffect(() => {
        usersCall();
        return () => setObj([]);
      }, [usersCall]);

    return (<>
        <NavBread activePage="UserDetail">
            <Link to={`/${role.val}/users`}>Users</Link>
        </NavBread>
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
