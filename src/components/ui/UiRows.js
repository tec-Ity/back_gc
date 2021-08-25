import React from 'react'

export default function UiRows(props) {
        const {UiRow, Objs, clickEvent } = props;
        return (<>
                {
                        Objs && UiRow
                        ? Objs.map(Obj => {
                                return (
                                        <UiRow Obj={Obj} clickEvent={clickEvent} key={Obj._id}/>
                                )
                        })
                        : <h3 className="text-danger"> UiRows Component params Error! </h3>
                }
        </>)
}
