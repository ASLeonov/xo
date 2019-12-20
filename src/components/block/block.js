import React, {useState, useEffect} from 'react'
import './block.css'
import GetContext from '../../decorators/getContext'

function Block(props) {
    const {blockKey, blockId, playerStep, onChangeStep} = props
    const {playerSymbol, botSymbol} = props.settings
    const [thisBlockValue, setThisBlockValue] = useState('-')

    useEffect( () => {
        if (thisBlockValue !== blockKey.value) setThisBlockValue(blockKey.value)
        // if (thisType !== playerSymbol && thisType !== matchType) return setMatchType(thisType)
        // if (thisType === playerSymbol && thisType !== matchType) return setMatchType(playerSymbol)
    } )

    return (
        <div
            className = 'block'
            onClick = {
                () => {
                    if (playerStep && thisBlockValue !== playerSymbol && thisBlockValue !== botSymbol) {
                        blockKey.value = playerSymbol
                        onChangeStep(blockId)
                        setThisBlockValue(blockKey.value)
                        // 
                    // console.log(resultObj)
                    }
                }
            }
        >            
            {thisBlockValue}
            {/* {console.log('render block')} */}
        </div>
    )
}

// just example of decorator, which connect to Context without using <Consumer> in component; it's not best way in this case;
export default GetContext(Block) 