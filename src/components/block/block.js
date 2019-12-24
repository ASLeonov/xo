import React, {useState, useEffect} from 'react'
import './block.css'
import GetContext from '../../decorators/getContext'

function Block(props) {
    const {blockKey, blockId, onChangeStep, style} = props
    const {playerSymbol, botSymbol} = props.settings
    const [thisBlockValue, setThisBlockValue] = useState('-')

    useEffect(() => {
        if (thisBlockValue !== blockKey.value) setThisBlockValue(blockKey.value)
    }, [blockKey.value, thisBlockValue])

    const player_style = (thisBlockValue === playerSymbol) ? 'player_style' : ''

    return (
        <div
            className = {style + " " + player_style}
            onClick = {
                () => {
                    if (thisBlockValue !== playerSymbol && thisBlockValue !== botSymbol) {
                        blockKey.value = playerSymbol
                        onChangeStep(blockId)
                        setThisBlockValue(blockKey.value)
                    }
                }
            }
        >            
            {thisBlockValue}
            {/* {console.log('render block', blockId)} */}
        </div>
    )
}

// just example of decorator, which connect to Context without using <Consumer> in component
export default GetContext(Block) 