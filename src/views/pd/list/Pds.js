import React, {useState, useEffect, useCallback} from 'react'
import { getObjs_Prom} from '../../../js/api'
import PdUiRow from './PdUiRow';
export default function Pds(props) {
        const [Pds, setPds] = useState([]);
        const apiPds = '/Pds';
        
        const PdsCallback = useCallback(
                () => {
                        getObjs_Prom(apiPds, Pds, setPds, true);
                        // eslint-disable-next-line react-hooks/exhaustive-deps
		}, [],
	)
        useEffect(() => {
                PdsCallback();
                return () => setPds([]);
        }, [PdsCallback])
        return (
                <div>
                        Pds List...
                        {
                                Pds.map(Pd => {
                                        return (
                                                <PdUiRow  key={Pd._id} Pd={Pd} role={props.role}/>
                                        )
                                })
                        }
                </div>
        )
}
