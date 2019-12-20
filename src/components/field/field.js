import React, {useState, useEffect} from 'react'
import './index.css'
import Block from '../block'
import GetContext from '../../decorators/getContext'
// import FieldDecorator from '../../decorators/fieldData'
import CheckResults from '../../selectors/checkResults'

function Field(props) {
    // const {playerSymbol, botSymbol, resultObj, fieldStyleCSS, freeBlocks, info} = props
    const {fieldSize, resultObj} = props
    const [playerStep, setPlayerStep] = useState(props.playerStep)
    const {playerSymbol, botSymbol} = props.settings
    const [gameState, setGameState] = useState({'result':false, 'winner':false})
    useEffect(() => setGameState({'result':false, 'winner':false}), [props])
    console.log('props.gameState ===>',props.gameState , '\ngameState ===>', gameState)


    // Баг, если BOT WIN => Первым ходят нолики...
 
        const fieldStyleCSS = {
            'width': fieldSize*100,
            'height': fieldSize*100,
        }

        const onChangeStep = (blockId) => {
            const checkResult = CheckResults({playerStep, fieldSize, playerSymbol, botSymbol, resultObj})
            console.log('checkResult =>', checkResult)
            if (checkResult) {
                setGameState({'result':true, 'winner':'PLAYER'})
            } else {
                delete props.freeBlocks[blockId]
                console.log('Переход хода')
                setPlayerStep(false)
            }
        }

        if (playerStep === false && !gameState.result) {
            const random_item = Math.floor(Math.random()*Object.keys(props.freeBlocks).length)
            const all_keys = Object.keys(props.freeBlocks)
                if (all_keys.length > 0) {
                    const need_value = all_keys[random_item]
                    delete props.freeBlocks[need_value]
                    resultObj[need_value].value = botSymbol
                }
            const checkResult = CheckResults({playerStep, fieldSize, playerSymbol, botSymbol, resultObj})
            if (checkResult) {
                setGameState({'result':true, 'winner':'BOT'})
            } else {
                setPlayerStep(true)
            }            
        }

            const blocks = []
            for (let x = 0; x < fieldSize; x++) {
                for (let y = 0; y < fieldSize; y++) {
                    const key = `${x+1}-${y+1}`
                    blocks.push(
                        <Block
                            key = {key}
                            blockKey ={resultObj[key]}
                            blockId = {key}
                            playerStep = {playerStep}
                            onChangeStep = {onChangeStep}
                        />
                    )
                }
            }

    // const info_string_1 =  gameOn ? ( playerStep ? 'Сейчас Ваш ход' : 'Ходит Бот...') : null
    const info_string_2 = gameState.result ? `THE ${gameState.winner} WIN !!!` : null

    return (
        <div className='field' >
            <div className='field_body' style={fieldStyleCSS}>
                {blocks}
                {console.log('render field', 'playerStep =>', playerStep)}
            </div>
            <div className='field_footer'>
                {/* {/* <p>{info_string_1}</p> */}
                <p style={{fontWeight:'bold'}}>{info_string_2}</p>
            </div>
            {/* <div className='reload'>
                Начать заново
            </div> */}
        </div>
    )
}

export default GetContext(Field)