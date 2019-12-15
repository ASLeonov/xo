import React, {useState, useEffect} from 'react'
import './block.css'
import {Consumer as SettingsConsumer} from '../../contexts/settings'

function Block(props) {
    const [matchType, setMatchType] = useState('-')
    const {resultObj, blockId} = props

    const thisBlock = resultObj[blockId]

    useEffect( () => {
        if (matchType !== '-') {
            thisBlock.value = matchType
            console.log(resultObj)
            checkResult()
        }
    })

    const checkResult = () => {

        const arr = []
            for (const key in resultObj) {
                if (resultObj[key].value === matchType) { 
                    arr.push( resultObj[key].id.slice(0, resultObj[key].id.indexOf("-")) )
                }
            }

        for (const item of arr) {
            const sovp = arr.filter( value => value === item )
            if (sovp.length >= 3) return console.log('Вы победили!!!')    
        }
    }

    return (
        <SettingsConsumer>
            { playerSymbol =>
                <div
                    className = 'block'
                    onClick = {
                        () => {
                            matchType !== 'x' && matchType !== 'o' && setMatchType(playerSymbol.symbol) 
                        }
                    }
                >            
                    {matchType}
                </div>
            }
        </SettingsConsumer>
    )
}

export default Block