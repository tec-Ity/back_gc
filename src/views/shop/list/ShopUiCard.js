import React from 'react'
import {Link} from 'react-router-dom'
import {get_DNS} from '../../../js/api'
import  {getRole} from '../../../js/conf/confUser';

export default function ShopUiCard(props) {
        const role = getRole();
        return (<>
                <div className="row">
                        {
                                props.Objects.map(Shop => {
                                        return (
                                                <div className="col-sm-6 col-md-4 col-lg-3" key={Shop._id}>
                                                        <div className="card" >
                                                                <Link  to={`/${role.val}/shop/${Shop._id}`}>
                                                                        <img alt={Shop.code} src={`${get_DNS()}${Shop.img_url}`} style={{width: "100px"}} />
                                                                </Link>
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
