import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {getRole} from '../js/conf/confUser';
import threshold from "../js/conf/threshold";
import './AppHeaderPc.css'

export default function AppHeaderPc(props) {
	const [spreadbar, setSpreadbar] = useState('');
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const role = getRole();

	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("role");
		localStorage.removeItem("name");
		localStorage.removeItem("curShop");
		props.logout();
	}
	const togSidebar = () => setSpreadbar((spreadbar==='') ? 'spreadbar' : '' );
	const hideSidebar = () => { /* setSpreadbar('') */  }

	const {links, name} = props; // 导航栏 icon lable 及 tooltip

	useEffect(() => {
		window.addEventListener("resize", () => setInnerWidth(window.innerWidth)); 
		return () => { setSpreadbar(""); setInnerWidth(""); }
	}, [])

	return (
		<div className={`sidebar ${spreadbar}`}>
			<div className="logo_content">
				<div className="logo">
					<i className='bx bxl-c-plus-plus'></i>
					<div className="logo_name">GC</div>
				</div>
				<i className='bx bx-menu' id="btn" onClick={togSidebar}></i>
			</div>
			<ul className="nav_list">
				<li>
					<i className='bx bx-search' onClick={togSidebar}></i>
					<input type="text" className="links_name " placeholder="Search..." />
					{
						innerWidth >= threshold.tooltip && <span className="tooltip">Search</span>
					}
				</li>
				{
					links&& links.map((link, index) => {
						return (
							<li key={`headerNavLink${index}`} onClick={hideSidebar}>
								<NavLink to={link.to} className="">
									<i className={link.icon}></i>
									<span className="links_name">{link.labal}</span>
								</NavLink>
								{
									innerWidth >= threshold.tooltip && <span className="tooltip">{link.labal}</span>
								}
								
							</li>
						)
					})
				}
			</ul>
			{
				props.name !== null&&
				<div className="profile_content">
					<div className="profile">
						<div className="profile_details">
							<img src={`${process.env.PUBLIC_URL}/dabai.jpeg`} alt="avatar" />
							<div className="name_job">
								<div className="name">{name}</div>
								<div className="job">{role.cn}</div>
							</div>
						</div>
						<i className='bx bx-log-out'  id="log_out" onClick={logout}></i>
					</div>
				</div>
			}
		</div>
	);
}
