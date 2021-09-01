/* 1登录 2登出 3安全路由验证 */
import { useState, useEffect, useCallback } from 'react';
import {  useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AppRouter from '../router/AppRouter';
import AppHeaderPc from './AppHeaderPc';
import AppHeaderMb from './AppHeaderMb';

import { selectUser, reducerRefreshToken} from '../features/authSlice'
import { getRolePath, role_Arrs } from '../js/conf/confUser';
import threshold from '../js/conf/threshold';

export default function AppLayout() {
	const hist = useHistory();
	const dispatch = useDispatch();
	const curUser = useSelector(selectUser);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const AppCallback = useCallback(
		() => {
			const refreshToken = localStorage.getItem('refreshToken');
			if(refreshToken) {
				dispatch(reducerRefreshToken());
				const role = parseInt(localStorage.getItem('role'));
				let rolePath = getRolePath();
				if(curUser.role === 'listen') console.log(1);
				if(!role_Arrs.includes(role)) {	// 未登录状态
					/* 直接跳转到未登录页面 */
					hist.replace(rolePath);
				} else { // 登录状态
					const pathname = window.location.pathname;
					const curPageRolePath = pathname.split('/')[1];
					/* 如果 应该跳转的URL 与 路由权限 不同 则跳转 */
					if(curPageRolePath !== rolePath) {
						hist.replace('/'+rolePath);
					}
				}
			} else {
				hist.replace('/home');
			}
			// hist.replace(rolePath)
		},
		[curUser.role, dispatch, hist],
	)

	/* 组件全部挂载完毕之后( 第一次打开页面) 要通过安全门 看是否允许进入此 路由, 相当于安全验证 */
	useEffect(() => {
		window.addEventListener("resize", () => setInnerWidth(window.innerWidth));  
		AppCallback();
	}, [AppCallback])

	return ( <>
		{
			innerWidth >= threshold.pc_mb
			?  (<>
				<AppHeaderPc  />
				<div className="home_content">
					<AppRouter />
				</div>
			</>)
			 : (<>
				 <AppHeaderMb  />
				 <AppRouter />
			</>)
		}
	</> );
}