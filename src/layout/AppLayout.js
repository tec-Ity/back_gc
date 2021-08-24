/* 1登录 2登出 3安全路由验证 */
import { useState, useEffect, useCallback } from 'react';
import {  useHistory} from 'react-router-dom';


import AppRouter from '../router/AppRouter';
import AppHeaderPc from './AppHeaderPc';
import AppHeaderMb from './AppHeaderMb';

import { nav_replace } from '../js/unique/appLayout/redirectFile';
import threshold from '../js/conf/threshold';

export default function AppLayout() {
	const hist = useHistory();

	const [refreshToken, setRefreshToken] = useState( localStorage.getItem("refreshToken") );
	const [name, setName] = useState( localStorage.getItem("name") );
	const [links, setLinks] = useState();
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const AppCallback = useCallback(
		({navLinks, role_path}) => {
			setLinks(navLinks);
			if(role_path === '/' || role_path === '/home') {	// 未登录状态
				/* 直接跳转到未登录页面 */
				hist.replace(role_path);
			} else { // 登录状态
				/* 如果路由权限与应该跳转的不同 则跳转 */
				const pathname = window.location.pathname;
				const rolePath = '/'+pathname.split('/')[1]
				if(rolePath !== role_path) hist.replace(role_path);
			}
			// hist.replace(role_path)
		},
		[hist],
	)

	/* 组件全部挂载完毕之后( 第一次打开页面) 要通过安全门 看是否允许进入此 路由, 相当于安全验证 */
	useEffect(() => {
		window.addEventListener("resize", () => setInnerWidth(window.innerWidth));  
		AppCallback( {...nav_replace(localStorage.getItem("role"))} );
	}, [AppCallback])

	const login = () => {
		setRefreshToken( localStorage.getItem("refreshToken"));
		setName(localStorage.getItem("name"))
		AppCallback( {...nav_replace(localStorage.getItem("role"))} );
	}
	const logout = () => {
		setRefreshToken( localStorage.getItem("refreshToken"));
		setName( localStorage.getItem("name"));
		AppCallback( {...nav_replace(localStorage.getItem("role"))} );
	}

	return ( <>
		{
			innerWidth >= threshold.pc_mb
			?  (<>
				<AppHeaderPc name={name} refreshToken={refreshToken} links={links} logout={logout}/>
				<div className="home_content">
					<AppRouter login={login}/>
				</div>
			</>)
			 : (<>
				 <AppHeaderMb name={name} refreshToken={refreshToken} links={links} logout={logout}/>
				 <AppRouter login={login}/>
			</>)
		}
	</> );
}