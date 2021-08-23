import {Link, Switch, Route} from 'react-router-dom';

import Users from '../views/user/list/Users';
import Shops from '../views/shop/list/Shops';
import Shop from '../views/shop/detail/Shop';

export default function OwerLayout() {
        return (<>
                <h1>Mger Page ...</h1>
                <div className="row mt-5">
                        <div className="col-3 col-md-2">
                                <Link className="list-group-item" to="/mger/users">users</Link>
                                <Link className="list-group-item" to="/mger/shops">shops</Link>
                        </div>
                        <div className="col-9 col-md-10">
                                <div className="container">
                                        <Switch>
                                                <Route path="/mger/users" > <Users/> </Route>
                                                <Route path="/mger/shops" > <Shops role='mger'/> </Route>
                                                <Route path="/mger/shop/:id" > <Shop/> </Route>
                                        </Switch>
                                </div>
                        </div>
                </div>
        </>)
}
