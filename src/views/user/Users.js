import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import confUser from '../../js/conf/confUser';
import { getObjs_Prom} from '../../js/api';
export default function Users(props) {
        const [Users, setUsers] = useState([]);
        const apiUsers = '/Users';

        const shopsCall = useCallback(
		() => {
			getObjs_Prom(apiUsers, Users, setUsers, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [],
	)
        useEffect(() => {
                shopsCall();
                return () =>{
                        setUsers([])
                }
        }, [shopsCall])
        return (
                <div>
                        Users List...
                        {
                                Users.map(User => {
                                        return (
                                                <div className="row" key={User._id}>
                                                        <div className="col-3">
                                                                <Link  to={`/${props.role}/shop/${User._id}`}>
                                                                        {User.code}
                                                                </Link>
                                                        </div>
                                                        <div className="col-3">{User.nome}</div>
                                                        <div className="col-3">{confUser.role[User.role]}</div>
                                                </div>
                                        )
                                })
                        }
                </div>
        )
}
