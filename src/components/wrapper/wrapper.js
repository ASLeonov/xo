import React from 'react'
import Field from '../field'
// import Block from '../block'

function Wrapper(props) {
    const {fieldSize, playerStep} = props.settings

    const blocks = []
    const resultObj = {}
    const freeBlocks = {}
    const thisGameState = {}

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

    thisGameState['result'] = false
    thisGameState['winner'] = false

    return (
        <div>
            <Field
                resultObj={resultObj}
                fieldSize={fieldSize}
                playerStep={playerStep}
                blocks={blocks}
                freeBlocks={freeBlocks}
                gameState={thisGameState}
            />
            {console.log('render wrapper')}
        </div>
    )
}

export default Wrapper