import React from 'react'
import {Consumer} from '../contexts/settings'

function GetContext(OriginalComponent) {
    // console.log('render Context decorator ---')
    return props => (
        <Consumer>
            {
                settings  => 
                    <OriginalComponent
                        {...props}
                        settings={settings}
                    />
            }
        </Consumer>
    ) 
}

export default GetContext