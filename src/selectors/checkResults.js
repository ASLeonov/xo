// import React from 'react'

function CheckResults(props) {
    const {playerStep, playerSymbol, botSymbol, resultObj} = props
    let res, stepSymbols
    const allPlayerSymbols = {}
    const allBotSymbols = {}
   
        for (const key in resultObj) {
            if (resultObj[key].value === playerSymbol) allPlayerSymbols[key] = resultObj[key]
            if (resultObj[key].value === botSymbol) allBotSymbols[key] = resultObj[key]
        }

    stepSymbols = playerStep ? allPlayerSymbols : allBotSymbols

    // console.log('obj in check =>', resultObj,'\nplayerStep =>', playerStep, '\nstepSymbols =>', stepSymbols)

    if (Object.keys(allPlayerSymbols).length >= 3 || Object.keys(allBotSymbols).length >= 3) {

        for (const key in stepSymbols) {

            const line_index = Number(key.slice(0, 1))
            const line = Object.values(stepSymbols).filter(item => item.x === line_index).map( item => item['y'] )
                if (line.length >= 3) {
                    for (let i = 0; i < line.length; i++) {
                        if (line[i+1]-line[i] === 1 && line[i+2]-line[i] === 2) res = `${playerStep ? 'PLAYER': 'BOT'} WIN !!!`
                    }
                }

            const column_index = Number(key.slice(2, 3))
            const column = Object.values(stepSymbols).filter(item => item.y === column_index).map( item => item['x'] )
                if (column.length >= 3) {
                    for (let i = 0; i < column.length; i++) {
                        if (column[i+1]-column[i] === 1 && column[i+2]-column[i] === 2) res = `${playerStep ? 'PLAYER': 'BOT'} WIN !!!`
                    }
                }

            // diag...

            if (!res && Object.keys(allPlayerSymbols).length + Object.keys(allBotSymbols).length === Object.keys(resultObj).length) {
                res = 'no_winner'
            }
        }
    }
    // console.log(Object.keys(allPlayerSymbols).length, Object.keys(allBotSymbols).length, Object.keys(resultObj).length)
    return res ? res : false
}

export default CheckResults