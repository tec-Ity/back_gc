import React from 'react'

export default function UiCards(props) {

        const {UiCard, objects, cols, clickEvent } = props;

        return (<>
                <div className="row">
                        {
                                objects && UiCard
                                ? objects.map(object => {
                                        return (
                                                <div className={cols? cols:"col-6 col-md-4 col-lg-3 mt-3"} key={object._id} >
                                                        <UiCard object={object} clickEvent={clickEvent} />
                                                </div>
                                        )
                                })
                                : <h3 className="text-danger"> UiCards Component params Error! </h3>
                        }        
                </div>
        </>)
}
