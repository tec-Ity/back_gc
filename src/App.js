import { Suspense } from 'react';
import {BrowserRouter} from 'react-router-dom';

import AppLayout from './layout/AppLayout';
import './App.css'

export default function App() {
	return (
		<BrowserRouter>
		<Suspense fallback={<>loading</>}>
			<AppLayout />
			</Suspense>
		</BrowserRouter>
	);
}