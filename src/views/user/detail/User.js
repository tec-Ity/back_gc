import React from 'react'
import { Link } from 'react-router-dom'

import  {getRole} from '../../../js/conf/confUser';

import NavBread from '../../../components/NavBread'

export default function User() {
    const role = getRole();

    return (<>

        <NavBread activePage="UserDetail">
            <Link to={`/${role.val}/users`}>Users</Link>
        </NavBread>
        <div className="row">
            <div className="col-2">
                User ...
            </div>
        </div>
    </>)
}
