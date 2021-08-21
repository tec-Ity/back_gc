import React from 'react'
import {Link} from 'react-router-dom'
import {get_DNS} from '../../../js/api'

export default function ShopUiRow(props) {
        return (<>
                {
                        props.Objects.map(Shop => {
                                return (
                                        <div className="row" key={Shop._id}>
                                                <div className="col-3">
                                                        <Link  to={`/${props.role}/shop/${Shop._id}`}>
                                                                <img alt={Shop.code} src={`${get_DNS()}${Shop.img_url}`} style={{width: "100px"}} />
                                                        </Link>
                                                </div>
                                                <div className="col-3">{Shop.code}</div>
                                                <div className="col-3">{Shop.nome}</div>
                                                <div className="col-3">{Shop.addr}</div>
                                        </div>
                                )
                        })
                }
        </>)
}
