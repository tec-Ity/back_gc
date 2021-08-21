import {NavLink} from 'react-router-dom';

import OwerRouter from './OwerRouter';

export default function OwerLayout() {
        return (<>
                <div className="row mt-3">
                        <div className="col-3 col-md-2">
                                <div className="position-fixed">
                                        <NavLink className="list-group-item" to="/ower/users">users</NavLink>
                                        <NavLink className="list-group-item" to="/ower/shops">shops</NavLink>
                                        <NavLink className="list-group-item" to="/ower/pds">products</NavLink>
                                </div>
                        </div>
                        <div className="col-9 col-md-10">
                                <div className="container">
                                        <OwerRouter />
                                </div>
                        </div>
                </div>
        </>)
}
