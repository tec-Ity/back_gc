import  React , { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";

import { getObjs_Prom, fetch_Prom } from "../../../js/api";

export default function UserAddModal(props) {
	const apiShops = "/Shops";
	const {onHide} = props;

	const [formdata, setFormdata] = useState({ code: "test", pwd: "111111" });
	const chgFormdata = (type) => (e) => setFormdata((pre) => ({ ...pre, [type]: e.target.value }));

	const [Shops, setShops] = useState([]);
	const crtObject = async () => {
		try {
			const userPost_res = await fetch_Prom("/userAdd", "POST", formdata);
			if (userPost_res.status === 200) {

			} else {
				console.log(userPost_res.message);
			}
		} catch (error) {
			console.log(error);
		}
	  };
	const UserAddCallback = useCallback(() => {
		getObjs_Prom(apiShops, Shops, setShops, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
	  useEffect(() => {
		UserAddCallback();
		return () => setShops([]);
	  }, [UserAddCallback]);

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter"> Create </Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className="my-3 row">
					<label htmlFor="code-ipt" className="col-sm-2 col-form-label "> code </label>
					<div className="col-sm-10">
						<input type="text" className="form-control" id="code-ipt" onChange={chgFormdata("code")} value={formdata.code} />
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="pwd-ipt" className="col-sm-2 col-form-label">Password</label>
					<div className="col-sm-10">
					<input
						type="password"
						className="form-control"
						id="pwd-ipt"
						onChange={chgFormdata("pwd")}
						value={formdata.pwd}
					/>
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary"onClick={onHide}>Close</Button>
				<Button variant="primary" onClick={crtObject}> Save Changes </Button>
			</Modal.Footer>
		</Modal>
  );
}
