import React from 'react'
import {get_DNS} from '../../../js/api'
import { FormattedMessage } from 'react-intl'; 

export default function UserCard(props) {
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
                        ? <div className="card"  onClick={clickEvent&&clickEvent(Obj)}>
                                <img 
                                        src={img_url}
                                        className="img-neat" 
                                        alt={Obj.code}
                                        style={{width: "100px",height:"100px"}}
                                />
                                <div className="card-body">
                                        <h5 className="card-title">{Obj.code+(Obj.nome && `[${Obj.nome}]`)}</h5>
                                        <p className="card-text">
                                                <FormattedMessage
                                                        id={`role-${Obj.role}`}
                                                        defaultMessage={Obj.role}
                                                />
                                        </p>
                                        <p className="card-text">{Obj.Shop?.code}</p>
                                </div>
                        </div>
                        :<h3 className="text-danger"> UserCard parameter Error! </h3>
                }
        </>)
}
