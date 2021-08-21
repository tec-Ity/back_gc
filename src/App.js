import {BrowserRouter} from 'react-router-dom';

import AppLayout from './router/AppLayout';

export default function App() {
	return (
		<BrowserRouter>
			<AppLayout />
		</BrowserRouter>
	);
}