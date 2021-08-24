import  React , { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";

import { getObjs_Prom, fetch_Prom } from "../../../js/api";
import RowIpt from "../../../components/basic/RowIpt";
import confUser from "../../../js/conf/confUser";
import threshold from "../../../js/conf/threshold";
import { get_DNS } from "../../../js/api";


export default function UserAddModal(props) {
	const {show, onHide, saveSuccess} = props;	// 模板的显示隐藏
	const text_flow = (window.innerWidth >= threshold.pc_mb)?"text-right": "text-left";

	const curRole = parseInt(localStorage.getItem('role'));
	
	const [formdata, setFormdata] = useState({
		code: "test1", 
		pwd: "111111",
		nome: "",
		phonePre: "0039",
		phone: "",
		Shop: "",
		role: 105,
	}); // 创建的数据
	
	const apiShops = "/Shops";
	const apiUserPost = "/UserPost";

	// const [pathShop, setPathShop] = useState('');
	const [isShop, setIsShop] = useState(false);		// 是否有店铺选项
	const [Shops, setShops] = useState([]);
	const [ShopSearch, setShopSearch] = useState("");

	const chgShopSearch = () => (e) => {
		const search = e.target.value;
		setFormdata((pre) =>({...pre, "Shop": ""}));
		setShopSearch(search);
		getObjs_Prom(`${apiShops}?search=${search}`, Shops, setShops, true);
	}
	const clickShopCard = (id, code) => (e) => {
		setFormdata((pre) =>({...pre, "Shop": id}));
		setShopSearch(code);
		setShops([])
	}
	const chgFormdata = (type) => (e) => setFormdata((pre) => ({ ...pre, [type]: e.target.value }));
	
	const roleFilterShops = (selRole) => {
		if(selRole > 100) {
			setIsShop(true);
			if(!Shops || Shops.length === 0) {
				getObjs_Prom(apiShops, Shops, setShops, true);
			}
		} else {
			setIsShop(false);
			setShopSearch("");
			setFormdata((pre) => ({...pre, "Shop": ""}));
		}
	}
	const chgRole = () => (e) =>{
		const selRole = e.target.value;
		roleFilterShops(selRole)
		setFormdata((pre) => ({ ...pre, "role":selRole }));
	} 

	const crtSubmit = async () => {
		try {
			// console.log(formdata)
			const userPost_res = await fetch_Prom(apiUserPost, "POST", {obj:formdata});
			if (userPost_res.status === 200) {
				saveSuccess(userPost_res.data.object);
				onHide();
			} else {
				console.log(userPost_res.message);
			}
		} catch (error) {
			console.log(error);
		}
	  };
	const UserAddCallback = useCallback(() => {
		roleFilterShops(formdata.role);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
	  useEffect(() => {
		UserAddCallback();
		return () => setShops([]);
	  }, [UserAddCallback]);

	return (
		<Modal onHide={onHide} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter"> Create </Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<form>
					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<input type="text" className="form-control" id="code-ipt" onChange={chgFormdata("code")} label="Codice" value={formdata.code} />
						<input type="text" className="form-control" id="nome-ipt" onChange={chgFormdata("nome")} label="Name" value={formdata.nome} />
					</RowIpt>

					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<input type="password" className="form-control" id="pwd-ipt" onChange={chgFormdata("pwd")} label="Password" value={formdata.pwd} />
					</RowIpt>

					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<input type="text" className="form-control" id="phonePre-ipt" onChange={chgFormdata("phonePre")} colnum="col-4 col-md-2" label="Phone" value={formdata.phonePre} />
						<input type="text" className="form-control" onChange={chgFormdata("phone")} colnum="col-8" value={formdata.phone} />
					</RowIpt>

					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<select className="form-control" id="role-ipt" data-style="btn-info"onChange={chgRole()}  label="Role" defaultValue={formdata.role}>
							<option>please select</option>
							{
								confUser.role_Arrs.map(item => {
									return (item>curRole) &&<option key={item} value={item}>{confUser.role[item].cn}</option> 
								})
							}
						</select>
					</RowIpt>

					{/*
						isShop &&
						<RowIpt rowClass={`my-3 ${text_flow}`}>
							<select className="form-control" id="shop-ipt" data-style="btn-info"onChange={chgRole()}  label="Shop">
								<option>please select</option>
								{
									Shops.map(item => {
										return <option key={item._id} value={item._id}>{item.code}</option>
									})
								}
							</select>
						</RowIpt>
					*/}
					{
						isShop &&(<>
							<div className={`row ${text_flow}`}>
								<label htmlFor="Shop-ipt" className={`col-md-2 col-form-label ${formdata.Shop&&"text-success"}`}> Shop</label>
								<div className="col-md-10">
									<input type="text" className="form-control" id="Shop-ipt" onChange={chgShopSearch()}  value={ShopSearch} />
								</div>
							</div>
							<div className="row mt-3">
								{
									Shops.map(Shop => {
										return (
											<div className="col-6 col-md-4 col-lg-3" key={Shop._id}>
												<div className="card" onClick={clickShopCard(Shop._id, Shop.code)}>
													<img alt={Shop.code} className="img-neat" src={`${get_DNS()}${Shop.img_url}`} style={{width: "100px",height:"100px"}} />
													<div className="card-body">
														<h5 className="card-title">{Shop.code} title</h5>
														<p className="card-text">{Shop.nome}</p>
														<p className="card-text">{Shop.addr}</p>
													</div>
												</div>
											</div>
										)
									})
								}
							</div>
						</>)
					}

				</form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary"onClick={onHide}>Close</Button>
				<Button variant="primary" onClick={crtSubmit}> Save Changes </Button>
			</Modal.Footer>
		</Modal>
	);
}