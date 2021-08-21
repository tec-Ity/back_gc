import React from 'react'
import {Link} from 'react-router-dom'
import {get_DNS} from '../../../js/api'

export default function PdUiRow(props) {
        return (
                <div className="row">
                        <div className="col-3">
                                <Link  to={`/${props.role}/pd/${props.Pd._id}`}>
                                        <img alt={props.Pd.code} src={`${get_DNS()}${props.Pd.img_urls[0]}`} style={{width: "100px"}} />
                                </Link>
                        </div>
                        <div className="col-3">{props.Pd.code}</div>
                        <div className="col-3">{props.Pd.nome}</div>
                </div>
        )
}
