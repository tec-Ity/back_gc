import React from 'react'
import {get_DNS} from '../../../js/api'

export default function ShopRow(props) {
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
                        ? <div className="row mt-3 align-middle" key={Obj._id}>
                                <div className="col-3">
                                        <img alt={Obj.code} src={img_url} className="img-neat" style={{width: "70px",height:"70px"}} />
                                </div>
                                <div className="col-3 text-primary" onClick={clickEvent&&clickEvent(Obj)}>{Obj.code}</div>
                                <div className="col-3">{Obj.nome}</div>
                                <div className="col-3">{Obj.addr}</div>
                        </div>
                        : <h3 className="text-danger"> ShopRow parameter Error! </h3>
                }

        </>)
}
