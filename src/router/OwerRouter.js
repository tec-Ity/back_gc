import { Switch, Route} from 'react-router-dom';

import Users from '../views/user/list/Users';
import User from '../views/user/detail/User';
import Shops from '../views/shop/list/Shops';
import Shop from '../views/shop/detail/Shop';
import Pds from '../views/pd/list/Pds';
import Pd from '../views/pd/detail/Pd';

export default function OwerRouter() {
	return (
		<div className="container mt-3">
			<Switch>
				<Route path="/ower/users" > <Users /> </Route>
				<Route path="/ower/user/:id" > <User /> </Route>
				<Route path="/ower/shops" > <Shops /> </Route>
				<Route path="/ower/shop/:id" > <Shop role='ower'/> </Route>
				<Route path="/ower/pds" > <Pds role='ower'/> </Route>
				<Route path="/ower/pd/:id" > <Pd role='ower'/> </Route>
			</Switch>
		</div>
	)
}
