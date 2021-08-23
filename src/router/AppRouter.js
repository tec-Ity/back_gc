import { Switch, Route, Redirect} from 'react-router-dom';

import HomePage from '../views/_home/HomePage';
import Errpage from '../views/_home/Errpage';

import OwerLayout from './OwerLayout';
import MgerLayout from './MgerLayout';
import SferLayout from './SferLayout';
import BserLayout from './BserLayout';
import WkerLayout from './WkerLayout';

export default function AppRouter(props) {
	return (
		<Switch>
			<Route path="/home" ><HomePage login={props.login}/></Route>
			
			<Route path="/errpage" component={Errpage} />
			
			<Route path="/ower" component={OwerLayout} />
			<Route path="/mger" component={MgerLayout} />
			<Route path="/sfer" component={SferLayout} />
			<Route path="/bser" component={BserLayout} />
			<Route path="/wker" component={WkerLayout} />
			<Redirect to="/home" />
		</Switch>
	)
}
