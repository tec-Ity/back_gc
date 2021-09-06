import React from 'react'

export default function UiRows(props) {
        const {UiRow, objects, clickEvent } = props;
        return (<>
                {
                        objects && UiRow
                        ? objects.map(object => {
                                return (
                                        <UiRow object={object} clickEvent={clickEvent} key={object._id}/>
                                )
                        })
                        : <h3 className="text-danger"> UiRows Component params Error! </h3>
                }
        </>)
}
