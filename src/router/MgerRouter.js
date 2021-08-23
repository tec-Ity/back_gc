import { Switch, Route} from 'react-router-dom';

import Users from '../views/user/list/Users';
import Shops from '../views/shop/list/Shops';
import Shop from '../views/shop/detail/Shop';

export default function MgerRouter() {
        return (<>
                <div className="container mt-3">
                        <Switch>
                                <Route path="/mger/users" > <Users/> </Route>
                                <Route path="/mger/shops" > <Shops role='mger'/> </Route>
                                <Route path="/mger/shop/:id" > <Shop/> </Route>
                        </Switch>
                </div>
        </>)
}
