import React from 'react'

export default function FilterSearch(props) {
        const {iptFilter, iptSearchVal} = props;
        return (
                <input type="text"  onChange={iptFilter} value={iptSearchVal} />
        )
}
