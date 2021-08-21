/* 1登录 2登出 3安全路由验证 */
import { useState, useEffect, useCallback } from 'react';
import {  useHistory} from 'react-router-dom';


import AppRouter from './AppRouter';
import AppHeader from './AppHeader';
import { nav_replace } from '../js/unique/appLayout/redirectFile';

export default function AppLayout() {
        const hist = useHistory();

        const [refreshToken, set_refreshToken] = useState( localStorage.getItem("refreshToken") );
	const [name, set_name] = useState( localStorage.getItem("name") );
        const [links, set_links] = useState();

        const AppCallback = useCallback(
		({navLinks, role_path}) => {
			set_links(navLinks);
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
		AppCallback( {...nav_replace(localStorage.getItem("role"))} );
	}, [AppCallback])

        const login = () => {
		set_refreshToken( localStorage.getItem("refreshToken"));
		set_name( localStorage.getItem("name"))

		AppCallback( {...nav_replace(localStorage.getItem("role"))} );

	}
        const logout = () => {
                set_refreshToken( localStorage.getItem("refreshToken"));
                set_name( localStorage.getItem("name"));
                AppCallback( {...nav_replace(localStorage.getItem("role"))} );
	}
	return ( <>
                <AppHeader name={name} refreshToken={refreshToken} links={links} logout={logout}/>
                <AppRouter login={login}/>
        </> );
}