import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
export default function UserAddModal(props) {
	const {onHide} = props;
	const crtObject = () => {
		console.log(1)
		onHide();
	}
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
				<h4>Centered Modal</h4>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary"onClick={onHide}>Close</Button>
				<Button variant="primary" onClick={crtObject}> Save Changes </Button>
			</Modal.Footer>
		</Modal>
  );
}
