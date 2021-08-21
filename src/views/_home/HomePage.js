import { useState, useEffect, useCallback } from "react";
import {useHistory} from "react-router-dom";

import { fetch_Prom } from '../../js/api';
import { nav_replace } from '../../js/unique/appLayout/redirectFile';

export default function HomePage(props) {
	const hist = useHistory();
	
	const [formdata, set_formdata] = useState({code:"test", pwd:"111111"});
	const setFormdata = type => e => set_formdata(pre => ({...pre, [type]: e.target.value}));

	const nav_replaceCall = useCallback(
		({role_path}) => {
			hist.replace(role_path)
		},
		[hist],
	)
	useEffect(() => {
		nav_replaceCall( {...nav_replace(localStorage.getItem("role"))} );
	}, [nav_replaceCall])

	const login = async() => {
		try {
			const login_res = await fetch_Prom('/login', 'POST', formdata);
			if (login_res.status === 200) {
				const curUser = login_res.data.curUser
				const name = curUser.nome?curUser.nome:curUser.code;
				localStorage.setItem("accessToken", login_res.data?.accessToken);
				localStorage.setItem("refreshToken", login_res.data?.refreshToken);
				localStorage.setItem("name",  name);
				localStorage.setItem("role", curUser.role);
				if(curUser.Shop) localStorage.setItem("curShop", curUser.Shop);
			}
                        props.login()
		} catch(error) {
			console.log(error);
		}
	}

	return (
		<div className="container">
			<div className="my-3 row">
				<label htmlFor="code-ipt" className="col-sm-2 col-form-label">code</label>
				<div className="col-sm-10">
					<input type="text"  className="form-control" id="code-ipt" onChange={setFormdata('code')} value={formdata.code} />
				</div>
			</div>
			<div className="mb-3 row">
				<label htmlFor="pwd-ipt" className="col-sm-2 col-form-label">Password</label>
				<div className="col-sm-10">
					<input type="password" className="form-control" id="pwd-ipt" onChange={setFormdata('pwd')} value={formdata.pwd} />
				</div>
			</div>
			<div className="mb-3 row">
			<div className="col-sm-2"></div>
				<div className="col-sm-10">
					<button className="btn btn-primary btn-block" onClick={login}> Login </button>
				</div>
			</div>
		</div>
	)
}
