import React from 'react'
import Field from '../field'

function Wrapper(props) {
    const {fieldSize} = props.settings
    const reloadApp = props.reloadApp

    const resultObj = {}
    const freeBlocks = {}
    const blocks = {}

    const fieldStyleCSS = {
        'width': fieldSize*100,
        'height': fieldSize*100,
    }

    for (let x = 0; x < fieldSize; x++) {
        for (let y = 0; y < fieldSize; y++) {
            const key = `${x+1}-${y+1}`
            const newObj = {}
            newObj['id'] = key
            newObj['value'] = '-'
            newObj['x'] = x+1
            newObj['y'] = y+1
            resultObj[key] = newObj
        }
    }
            
    for (let key in resultObj) freeBlocks[key] = ''

    return (
        <div>
            <Field
                fieldSize={fieldSize}
                fieldStyleCSS={fieldStyleCSS}
                resultObj={resultObj}
                freeBlocks={freeBlocks}
                blocks={blocks}
                reloadApp={reloadApp}
            />
            {/* {console.log('render wrapper')} */}
        </div>
    )
}

export default Wrapper