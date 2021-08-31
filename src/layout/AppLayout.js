/* 1登录 2登出 3安全路由验证 */
import { useState, useEffect, useCallback } from 'react';
import {  useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AppRouter from '../router/AppRouter';
import AppHeaderPc from './AppHeaderPc';
import AppHeaderMb from './AppHeaderMb';

import { selectUser, reducerRefreshToken} from '../features/authSlice'
import { getRolePath } from '../js/conf/confUser';
import threshold from '../js/conf/threshold';

export default function AppLayout() {
	const hist = useHistory();
	const dispatch = useDispatch();
	const curUser = useSelector(selectUser);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const AppCallback = useCallback(
		() => {
			const refreshToken = localStorage.getItem('refreshToken');
			if(refreshToken) dispatch(reducerRefreshToken());

			if(getRolePath(curUser.role) === '/' || getRolePath() === '/home') {	// 未登录状态
				/* 直接跳转到未登录页面 */
				hist.replace(getRolePath());
			} else { // 登录状态
				const pathname = window.location.pathname;
				const rolePath = pathname.split('/')[1];
				/* 如果路由权限与应该跳转的不同 则跳转 */
				if(rolePath !== getRolePath()) hist.replace('/'+getRolePath());
			}
			// hist.replace(getRolePath())
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