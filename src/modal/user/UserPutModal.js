import  React , { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import {  useDispatch } from 'react-redux';

import { getObjs_Prom } from "../../js/api";
import threshold from "../../js/conf/threshold";
import { role_Arrs } from "../../js/conf/confUser"
import { FormattedMessage } from "react-intl";

import RowIpt from "../../components/basic/RowIpt";
import UiCards from "../../components/ui/UiCards";
import ShopCard from "../../components/ui/shop/ShopCart";

import {putObject} from '../../features/objectsSlice';

export default function UserPutModal(props) {
	const {show, onHide,  object} = props;	// 模板的显示隐藏
	const text_flow = (window.innerWidth >= threshold.pc_mb)?"text-right": "text-left";
	
	const dispatch = useDispatch();
	const curRole = parseInt(localStorage.getItem('role'));
	
	const apiShops = "/Shops";
	const flagSlice = 'user';
	const api = "/UserPut/"+object._id;

	const [formdata, setFormdata] = useState(object); // 创建的数据
	
	// const [pathShop, setPathShop] = useState('');
	const [isShop, setIsShop] = useState(false);		// 是否有店铺选项
	const [Shops, setShops] = useState([]);
	const [ShopSearch, setShopSearch] = useState(object.Shop?object.Shop.code:"");
	
	const iptShopSearch = () => (e) => {
		const search = e.target.value;
		setFormdata((pre) =>({...pre, "Shop": ""}));
		setShopSearch(search);
		getObjs_Prom(`${apiShops}?search=${search}`, Shops, setShops, true);
	}
	const clickShopCard = (object) => (e) => {
		setFormdata((pre) =>({...pre, "Shop": object._id}));
		setShopSearch(object.code);
		setShops([])
	}
	
	const iptFormdata = (type) => (e) => setFormdata((pre) => ({ ...pre, [type]: e.target.value }));
	
	const roleFilterShops = (selRole) => {
		if(selRole > 100) {
			setIsShop(true);
			if(!Shops || Shops.length === 0) {
				getObjs_Prom(`${apiShops}?search=${ShopSearch}`, Shops, setShops, true);
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
	
	const putSubmit = () => {
		dispatch(putObject({flagSlice, api, data: {obj: formdata}}));
		onHide();
	};
	const UserPutCallback = useCallback(() => {
                const {code, nome, phonePre, phone, role } = object;
		const Shop = object.Shop ? object.Shop._id : null;
		if(object.Shop) {
			// setShops
		}
                setFormdata({code, nome, phonePre, phone, role, Shop});
		roleFilterShops(formdata.role);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		UserPutCallback();
		return () => {
			setShops([]);
			setShopSearch("");
		}
	}, [UserPutCallback]);
	
	return (
		
		<Modal onHide={onHide} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter"> Update </Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<form>
					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<input type="text" className="form-control" id="code-ipt" onChange={iptFormdata("code")} label="Codice" value={formdata.code} />
						<input type="text" className="form-control" id="nome-ipt" onChange={iptFormdata("nome")} label="Name" value={formdata.nome} />
					</RowIpt>

					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<input type="text" className="form-control" id="phonePre-ipt" onChange={iptFormdata("phonePre")} colnum="col-4 col-md-2" label="Phone" value={formdata.phonePre} />
						<input type="text" className="form-control" onChange={iptFormdata("phone")} colnum="col-8" value={formdata.phone} />
					</RowIpt>
					{
						localStorage.getItem('_id') !== object._id && 
						(<>
						<RowIpt rowClass={`my-3 ${text_flow}`}>
							<select className="form-control" id="role-ipt" data-style="btn-info"onChange={chgRole()}  label="Role" defaultValue={formdata.role}>
								<option>please select</option>
								{
									role_Arrs.map(item => {
										return (item>curRole) &&
										<FormattedMessage id={`role-${item}`} key={item}>
											{(message) => <option value={item}>{message}</option>}
										</FormattedMessage>
									})
								}
							</select>
						</RowIpt>

						{
							isShop &&(<>
								<div className={`row ${text_flow}`}>
									<label htmlFor="Shop-ipt" className={`col-md-2 col-form-label ${formdata.Shop&&"text-success"}`}> Shop</label>
									<div className="col-md-10">
										<input type="text" className="form-control" id="Shop-ipt" onChange={iptShopSearch()}  value={ShopSearch} />
									</div>
								</div>

								<div className="row">
									<div className="col-md-2"></div>
									<div className="col-md-10">
										<UiCards UiCard={ShopCard} objects={Shops} cols="col-6 col-md-4 col-xl-3 mt-2" clickEvent={clickShopCard}/>
									</div>
								</div>
							</>)
						}
						</>)
					}
				</form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary"onClick={onHide}>
					<FormattedMessage id='close' />
				</Button>
				<Button variant="primary" onClick={putSubmit}> <FormattedMessage id='confirm' /> </Button>
			</Modal.Footer>
		</Modal>
	);
}