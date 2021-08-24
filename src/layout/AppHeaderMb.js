import { NavLink, Link } from "react-router-dom";

export default function AppHeaderMb(props) {
	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("role");
		localStorage.removeItem("name");
		localStorage.removeItem("curShop");
		props.logout();
	}
	return (<>
		{/* <div style={{height: "61px", backgroundColor: "#000000"}}></div> */}
		<div style={{height: "61px"}}></div>
		<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					<img alt="" src={`${process.env.PUBLIC_URL}/favicon.ico`} style={{height: "35px"}} />
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
						<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						
						<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
							{
								props.name !== null&&
								 <>
									{
										props.links?.map(item => {
											return (
												<li  key={item.labal} className="nav-item">
													<NavLink className="nav-link" to={item.to}>{item.labal}</NavLink>
												</li>
											)
										})
									}
									<li  className="nav-item">
										<NavLink className="text-dark nav-link"  to='/center'>center:{props.name}</NavLink>
									</li>
									<li  className="nav-item">
										<div className="text-danger  nav-link" onClick={logout}>logout</div>
									</li>
								</>
							}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</>);
}
