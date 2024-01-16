
import urlContext from "./urlContext";

import React from 'react'

const UrlState = (props) => {
    // const url = 'https://narangg.onrender.com/'
    const url="http://localhost:9000/"
    return (
        <urlContext.Provider value={url}>
            {props.children}
        </urlContext.Provider>
    )
}

export default UrlState