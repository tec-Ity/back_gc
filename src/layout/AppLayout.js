/* 1登录 2登出 3安全路由验证 */
import { useState, useEffect, useCallback } from 'react';
import {  useHistory} from 'react-router-dom';

import AppRouter from '../router/AppRouter';
import AppHeaderPc from './AppHeaderPc';
import AppHeaderMb from './AppHeaderMb';

import { getRolePath, getRoleRoute } from '../js/conf/confUser';
import threshold from '../js/conf/threshold';

export default function AppLayout() {
	const hist = useHistory();

	const [name, setName] = useState( localStorage.getItem("name") );
	const [links, setLinks] = useState();
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const AppCallback = useCallback(
		() => {
			setLinks(getRoleRoute());
			if(getRolePath() === '/' || getRolePath() === '/home') {	// 未登录状态
				/* 直接跳转到未登录页面 */
				hist.replace(getRolePath());
			} else { // 登录状态
				/* 如果路由权限与应该跳转的不同 则跳转 */
				const pathname = window.location.pathname;
				const rolePath = pathname.split('/')[1];
				if(rolePath !== getRolePath()) hist.replace('/'+getRolePath());
			}
			// hist.replace(getRolePath())
		},
		[hist],
	)

	/* 组件全部挂载完毕之后( 第一次打开页面) 要通过安全门 看是否允许进入此 路由, 相当于安全验证 */
	useEffect(() => {
		window.addEventListener("resize", () => setInnerWidth(window.innerWidth));  
		AppCallback();
	}, [AppCallback])

	const login = () => {
		setName(localStorage.getItem("name"))
		AppCallback();
	}
	const logout = () => {
		setName( localStorage.getItem("name"));
		AppCallback();
	}

	return ( <>
		{
			innerWidth >= threshold.pc_mb
			?  (<>
				<AppHeaderPc name={name}  links={links} logout={logout}/>
				<div className="home_content">
					<AppRouter login={login}/>
				</div>
			</>)
			 : (<>
				 <AppHeaderMb name={name}  links={links} logout={logout}/>
				 <AppRouter login={login}/>
			</>)
		}
	</> );
}