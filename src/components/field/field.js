import React from 'react'
import Block from '../block'
import './index.css'

function Field(props) {
    const size = props.fieldSize
    const resultObj = {}
        for (let i = 0; i < size; i++) {
            for (let k = 0; k < size; k++) {
                let newObj = {}
                newObj['id'] = `${i+1}-${k+1}`
                newObj['value'] = ''
                resultObj[`${i+1}-${k+1}`] = newObj
            }   
        }
        console.log(resultObj)

    const fieldSizeCSS = size*100
    const fieldStyleCSS = {
        'width': fieldSizeCSS,
        'height': fieldSizeCSS,
    }

    const blocks = []
        for (let i = 0; i < size; i++) {
            for (let k = 0; k < size; k++) {
                blocks.push(<Block key={`${i}-${k}`} resultObj={resultObj} blockId={`${i+1}-${k+1}`} />)
            }
        }

    return (
        <div className='field' style={fieldStyleCSS}>
            {blocks}
        </div>
    )
}

export default Field