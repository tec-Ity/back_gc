import {get_DNS} from '../../../js/api'
import {getLang} from '../../../js/lang/frontLang';

export default function UserRow(props) {

        const { Obj, clickEvent } = props;
        let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
        if(Obj?.img_url) {
                img_url = get_DNS()+Obj.img_url;
        } else if(Obj?.img_urls?.length > 0) {
                img_url = get_DNS()+Obj.img_urls[0];
        }

        return (<>
                {
                        Obj
                        ? <div className="row mt-5 align-middle" key={Obj._id}>
                                <div className="col-2 col-md-1" onClick={clickEvent&&clickEvent(Obj)}>
                                        <img alt={Obj.code} src={img_url} className="img-neat" style={{width: "100%",height:"70px"}} />
                                </div>
                                <div className="col-10 col-md-11 border rounded">
                                        <div className="row">
                                                <div className="mt-3 col-4 col-md-2 text-primary" onClick={clickEvent&&clickEvent(Obj)}>{Obj.code}</div>
                                                <div className="mt-3 col-4 col-md-2">{Obj.nome}</div>
                                                <div className="mt-3 col-4 col-md-2">{getLang('role')[Obj.role]}</div>
                                                <div className="mt-3 col-4 col-md-2">{Obj.Shop?.code}</div>
                                                <div className="mt-3 col-8 col-md-4">{Obj.phone && Obj.phonePre+' '+Obj.phone}</div>
                                        </div>
                                </div>
                        </div>
                        : <h3 className="text-danger"> UserRow parameter Error! </h3>
                }

        </>)
}
