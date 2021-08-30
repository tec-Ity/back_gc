import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";

import { getRolePath } from "../../js/conf/confUser";
import {LangConf, systemLangs } from "../../js/lang/frontLang";
import {getLang} from "../../js/lang/frontLang";

export default function LangUpdModal(props) {
        const langFile = 'LangUpdModal';
        const rolePaht = getRolePath();
        const hist = useHistory();
        const {onHide, show, lang, setLang} = props;

        const storeLang = (item) => (e) => {
                localStorage.setItem("lang", item);
                setLang(localStorage.getItem('lang'));
                // window.location.reload();
                hist.push(`/${rolePaht}/reload`)
                onHide();
        }

	return (
		<Modal onHide={onHide} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter"> {getLang(langFile).title} </Modal.Title>
			</Modal.Header>

			<Modal.Body>
                                <div className="row text-center">
                                {
                                        systemLangs.map(item => {
                                                return <div className="col-3 col-md-2" key={item} >
                                                        {
                                                                item === lang
                                                                ?<button className="btn btn-success">{LangConf[item]}</button>
                                                                :<button className="btn btn-outline-success" onClick={storeLang(item)}>{LangConf[item]}</button>
                                                        }
                                                </div>
                                        })
                                
                                }
                        </div>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary"onClick={onHide}>{getLang(langFile).close}</Button>
			</Modal.Footer>
		</Modal>
	);
}