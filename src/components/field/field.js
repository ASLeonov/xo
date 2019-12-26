import React, {useState, useEffect} from 'react'
import './index.css'
import Block from '../block'
import GetContext from '../../decorators/getContext'
import CheckResults from '../../selectors/checkResults'
import {BotStep} from '../../selectors/botStep'

function Field(props) {
    const {fieldSize, fieldStyleCSS, resultObj, freeBlocks, blocks, reloadApp} = props
    const {playerName, playerSymbol, botSymbol} = props.settings

    const [playerStep, setPlayerStep] = useState(props.settings.playerStep)
    const [gameState, setGameState] = useState({'result':false, 'winner':false})

    const matchBlockEndGame = checkResult => {
        for (const key in checkResult) {
            blocks[key] =
                <Block
                    key = {key}
                    blockKey ={resultObj[key]}
                    blockId = {key}
                    onChangeStep = {onChangeStep}
                    style = {'block block_endGame'}
                />
        }
    }

    const createBlock = key => {
        blocks[key] =
            <Block
                key = {key}
                blockKey = {resultObj[key]}
                blockId = {key}
                onChangeStep = {onChangeStep}
                style = {'block'}
            />
    }

    const onChangeStep = blockId => {
        const checkResult = CheckResults({playerStep, playerSymbol, botSymbol, resultObj})
        if (checkResult) {
            if (checkResult === 'no_winner') return setGameState({'result':true, 'winner':'no_winner'})
            matchBlockEndGame(checkResult)
            setGameState({'result':true, 'winner':'PLAYER'})
            setPlayerStep(false)
        } else {
            delete freeBlocks[blockId]
            setPlayerStep(false)
        }
    }

    if (Object.keys(blocks).length === 0 && playerStep === props.settings.playerStep) {
        for (let x = 0; x < fieldSize; x++) {
            for (let y = 0; y < fieldSize; y++) {
                const key = `${x+1}-${y+1}`
                    createBlock(key)
            }
        }
    }

    useEffect(() => {   // set initial state for playerStep after 1-st render; set all initial states of component when reload App
        setGameState({'result':false, 'winner':false})
        setPlayerStep(props.settings.playerStep)
    }, [props.settings])

    useEffect(() => {
        if (playerStep === false && !gameState.result) {
            setTimeout(() => {
                BotStep({fieldSize, freeBlocks, resultObj, playerSymbol, botSymbol, createBlock})
                const checkResult = CheckResults({playerStep, playerSymbol, botSymbol, resultObj})
                if (checkResult) {
                    if (checkResult === 'no_winner') return setGameState({'result':true, 'winner':'no_winner'})
                    matchBlockEndGame(checkResult)
                    setGameState({'result':true, 'winner':'BOT'})
                } else {
                    setPlayerStep(true)
                }
            }, 1100)
        }
    })

    const info_string_1 = 
        !gameState.result 
            ? (playerStep ? ` ${playerName}, your\u00A0step` : 'Bot is active...').replace(' ,', '') 
                : null

    const info_string_2 = 
        gameState.result ? 
            (gameState.winner !== 'no_winner') ?
                (gameState.winner === 'PLAYER') ?
                    `${playerName} WIN ★★★` : 'THE BOT WIN ✦' :
            'NO WINNER ❋'
        : null

    // const reloadBtn = 
    //     ( playerStep || (!playerStep && gameState.result) ) 
    //         ? <div className='reload' onClick={reloadApp}>New game</div> 
    //             : <div className='reload'></div>
    const disabledBtn = (playerStep || (!playerStep && gameState.result)) ? '' : 'disabled'

    const blockedBlockes = 
    ( !playerStep )
        ? <div className='field_body field_body__blocked' style={fieldStyleCSS}></div>
            : null

    return (
        <div className='field' >
            <div className='field_body' style={fieldStyleCSS}>
                {Object.values({...blocks})}
            </div>
                {blockedBlockes}
            <div className='field_footer'>
                <p>{info_string_1}</p>
                <p style={{fontWeight:'bold'}}>{info_string_2}</p>
            </div>
                {/* {reloadBtn} */}
                <button className='reload' disabled={disabledBtn} onClick={reloadApp}>
                    New game
                </button>
                {/* {console.log('render field')} */}
        </div>
    )
}

export default GetContext(Field)