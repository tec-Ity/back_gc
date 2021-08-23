import React, {useState, useEffect, useCallback} from 'react'
import { getObjs_Prom} from '../../../js/api'

import UiVariety from '../../../components/UiVariety'
import ShopUiRow from './ShopUiRow';
import ShopUiCard from './ShopUiCard';
export default function Shops(props) {
	const [Objects, setObjects] = useState([]);
	const api = '/Shops';

	const shopsCall = useCallback(
		() => {
			getObjs_Prom(api, Objects, setObjects, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [],
	)

	useEffect(() => {
		shopsCall();
		return () => setObjects([])
	}, [shopsCall])

	return (
		<div>
			<UiVariety UiRow={ShopUiRow} UiCard={ShopUiCard} Objects={Objects} role={props.role}/>
		</div>
	)
}
