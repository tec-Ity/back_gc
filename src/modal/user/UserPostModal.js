import  React , { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage } from 'react-intl'; 
import { useSelector, useDispatch } from 'react-redux';

import threshold from "../../js/conf/threshold";
import { role_Arrs} from "../../js/conf/confUser";

import RowIpt from "../../components/basic/RowIpt";
import UiCards from "../../components/ui/UiCards";
import ShopCard from "../../components/ui/shop/ShopCard";
import SearchInput from "../../components/universal/query/SearchInput";

import {selectObjects, postObject} from '../../features/objectsSlice';

export default function UserPostModal(props) {
	const {flagSlice, show, onHide} = props;	// 模板的显示隐藏
	const text_flow = (window.innerWidth >= threshold.pc_mb)?"text-right": "text-left";

	const dispatch = useDispatch();
	const curRole = parseInt(localStorage.getItem('role'));
	
	const flagSlice_Shops = "user_Shops";
	const api_Shops = "/Shops";
	const api = "/UserPost";

	const [formdata, setFormdata] = useState({code: '', nome: '', role: '', pwd: '111111', phonePre: '0039', phone: ''}); // 创建的数据
	
	const [farQuery_Shops, setfarQuery_Shops] = useState({});		// 是否有店铺选项
	const [isShop, setIsShop] = useState(false);		// 是否有店铺选项
	const Shops = useSelector(selectObjects(flagSlice_Shops));
	//
	const clickShopCard = (obj) => (e) => {
		setFormdata((pre) =>({...pre, "Shop": obj._id}));
		setfarQuery_Shops({key: 'search', val: obj.code});
	}

	const iptFormdata = (type) => (e) => setFormdata((pre) => ({ ...pre, [type]: e.target.value }));
	const matchSearchCode = (mCode) => {
		Shops.forEach(obj => {
			if(obj.code === mCode.toUpperCase()) {
				setFormdata((pre) =>({...pre, "Shop": obj._id}));
			} else {
				if(formdata.Shop) {
					const temp = {...formdata}
					temp.Shop = null;
					setFormdata(temp);
				}
			}
		})
	}

	const roleFilterShops = (selRole) => {
		if(selRole > 100) {
			setIsShop(true);
		} else {
			setIsShop(false);
			setFormdata((pre) => ({...pre, "Shop": ""}));
		}
	}
	const chgRole = () => (e) =>{
		const selRole = e.target.value;
		roleFilterShops(selRole)
		setFormdata((pre) => ({ ...pre, "role":selRole }));
	} 

	const postSubmit = () => {
		dispatch(postObject({flagSlice, api, data: {obj: formdata}}))
		onHide();
	};

	
	useEffect(() => {
		roleFilterShops(formdata.role);
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);

	return (
		<Modal onHide={onHide} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<FormattedMessage
						id='create'
						defaultMessage='Create'
					/>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<form>
					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<input type="text" className="form-control" id="code-ipt" onChange={iptFormdata("code")} label="Codice" value={formdata.code} />
						<input type="text" className="form-control" id="nome-ipt" onChange={iptFormdata("nome")} label="Name" value={formdata.nome} />
					</RowIpt>

					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<input type="password" className="form-control" id="pwd-ipt" onChange={iptFormdata("pwd")} label="Password" value={formdata.pwd} />
					</RowIpt>

					<RowIpt rowClass={`my-3 ${text_flow}`}>
						<input type="text" className="form-control" id="phonePre-ipt" onChange={iptFormdata("phonePre")} colnum="col-4 col-md-2" label="Phone" value={formdata.phonePre} />
						<input type="text" className="form-control" onChange={iptFormdata("phone")} colnum="col-8" value={formdata.phone} />
					</RowIpt>

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
								<label className={`col-md-2 col-form-label ${formdata.Shop&&"text-success"}`}> Shop</label>
								<div className="col-md-10">
									<SearchInput 
										flagSlice={flagSlice_Shops}
										api={api_Shops}
										farQuery={farQuery_Shops}
										matchSearchCode={matchSearchCode}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-md-2"></div>
								<div className="col-md-10">
									<UiCards
										cols="col-6 col-md-4 col-xl-3 mt-2"
										propsCard={ShopCard}
										objects={Shops}
										matchId={formdata.Shop}
										clickEvent={clickShopCard}
									/>
								</div>
							</div>
						</>)
					}
				</form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary"onClick={onHide}>
					<FormattedMessage
						id='close'
						defaultMessage='Close'
					/>
				</Button>
				<Button variant="primary" onClick={postSubmit}>
					<FormattedMessage
						id='confirm'
						defaultMessage='Confirm'
					/>
				</Button>
			</Modal.Footer>
		</Modal>
	);
}