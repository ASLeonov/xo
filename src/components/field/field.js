import React, {useState, useEffect} from 'react'
import './index.css'
import Block from '../block'
import GetContext from '../../decorators/getContext'
import CheckResults from '../../selectors/checkResults'

function Field(props) {
    const {fieldSize, fieldStyleCSS, resultObj, freeBlocks, blocks, reloadApp} = props
    const {playerSymbol, botSymbol} = props.settings

    const [playerStep, setPlayerStep] = useState(true)
    const [gameState, setGameState] = useState({'result':false, 'winner':false})

    const onChangeStep = (blockId) => {
        const checkResult = CheckResults({playerStep, playerSymbol, botSymbol, resultObj})
        if (checkResult) {
            if (checkResult === 'no_winner') return setGameState({'result':true, 'winner':'no_winner'})
            setGameState({'result':true, 'winner':'PLAYER'})
            setPlayerStep(false)
        } else {
            delete freeBlocks[blockId]
            setPlayerStep(false)
        }
    }

    if (Object.keys(blocks).length === 0 && playerStep === props.settings.playerStep) {
        console.log('create blocks...', playerStep)
        for (let x = 0; x < fieldSize; x++) {
            for (let y = 0; y < fieldSize; y++) {
                const key = `${x+1}-${y+1}`
                // blocks.push(
                    blocks[key] =
                        <Block
                            key = {key}
                            blockKey ={resultObj[key]}
                            blockId = {key}
                            playerStep = {playerStep}
                            onChangeStep = {onChangeStep}
                        />
                // )
            }
        }
    }

    useEffect(() => {   // set initial state for playerStep after 1-st render; set all initial states of component when reload App
        setGameState({'result':false, 'winner':false})
        setPlayerStep(true)
    }, [props])

    useEffect(() => {
        if (playerStep === false && !gameState.result) {
            setTimeout(() => {
                const random_item = Math.floor(Math.random()*Object.keys(freeBlocks).length)
                const all_keys = Object.keys(freeBlocks)
                    if (all_keys.length > 0) {
                        const need_value = all_keys[random_item]
                        delete freeBlocks[need_value]
                        resultObj[need_value].value = botSymbol
                        blocks[need_value] =
                            <Block
                                key = {need_value}
                                blockKey ={resultObj[need_value]}
                                blockId = {need_value}
                                playerStep = {playerStep}
                                onChangeStep = {onChangeStep}
                            />
                    }
                const checkResult = CheckResults({playerStep, playerSymbol, botSymbol, resultObj})
                if (checkResult) {
                    checkResult !== 'no_winner' ? setGameState({'result':true, 'winner':'BOT'}) : setGameState({'result':true, 'winner':'no_winner'})
                } else {
                    setPlayerStep(true)
                }
            }, 1100)
        }
    })

    const info_string_1 = !gameState.result ? ( playerStep ? `It's your step` : 'Bot is active...') : null
    const info_string_2 = 
        gameState.result ? 
            (gameState.winner !== 'no_winner' ? `THE ${gameState.winner} WIN !!!` : 'NO WINNER !') 
                : null
    const reloadBtn = 
        ( playerStep || (!playerStep && gameState.result) ) 
            ? <div className='reload' onClick={reloadApp}>New game</div> 
                : <div className='reload'></div>

    return (
        <div className='field' >
            <div className='field_body' style={fieldStyleCSS}>
                {Object.values(blocks)}
                {console.log('render field', resultObj, '\n', playerStep)}
            </div>
            <div className='field_footer'>
                <p>{info_string_1}</p>
                <p style={{fontWeight:'bold'}}>{info_string_2}</p>
            </div>
            {reloadBtn}
        </div>
    )
}

export default GetContext(Field)