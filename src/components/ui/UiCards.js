import React from 'react'

export default function UiCards(props) {

        const {UiCard, Objs, cols, clickEvent } = props;

        return (<>
                <div className="row">
                        {
                                Objs && UiCard
                                ? Objs.map(Obj => {
                                        return (
                                                <div className={cols? cols:"col-6 col-md-4 col-lg-3 mt-3"} key={Obj._id} >
                                                        <UiCard Obj={Obj} clickEvent={clickEvent} />
                                                </div>
                                        )
                                })
                                : <h3 className="text-danger"> UiCards Component params Error! </h3>
                        }        
                </div>
        </>)
}
