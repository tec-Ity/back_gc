import React from 'react'
import { Link } from 'react-router-dom'

export default function User() {
    return (<>
        <div className="row">
            <div className="col-2">
                <Link className="btn btn-secondary" to='/ower/users'>返回</Link>
            </div>
        </div>
        <div className="row">
            <div className="col-2">
                User ...
            </div>
        </div>
    </>)
}
