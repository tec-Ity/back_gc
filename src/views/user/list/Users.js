import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import confUser from '../../../js/conf/confUser';
import { getObjs_Prom} from '../../../js/api';

export default function Users(props) {
	const [Users, setUsers] = useState([]);
	const apiUsers = '/Users';

	const shopsCall = useCallback(
		() => {
			getObjs_Prom(apiUsers, Users, setUsers, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [],
	)
	useEffect(() => {
		shopsCall();
		return () =>{
			setUsers([])
		}
	}, [shopsCall])
	const {role} = props;
	return (
		<>
			<div className="row">
				<div className="col-md-11">
					<ol className="breadcrumb">
						<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
						<li className="breadcrumb-item active" aria-current="page">Users</li>
					</ol>
				</div>
				<div className="col-md-1">
					<Link className="btn btn-info" to={`/${role}/userAdd`}>+</Link>
				</div>
			</div>
			<div className="list mt-3">
				{
					Users.map(User => {
						return (
							<div className="row" key={User._id}>
								<div className="col-3">
									<Link  to={`/${role}/user/${User._id}`}>
										{User.code}
									</Link>
								</div>
								<div className="col-3">{User.nome}</div>
								<div className="col-3">{confUser.role[User.role]}</div>
							</div>
						)
					})
				}
			</div>
		</>
	)
}
