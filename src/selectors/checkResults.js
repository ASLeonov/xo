function CheckResults(props) {
    const {playerStep, playerSymbol, botSymbol, resultObj} = props
    let res
    const allPlayerSymbols = {}
    const allBotSymbols = {}
   
        for (const key in resultObj) {
            if (resultObj[key].value === playerSymbol) allPlayerSymbols[key] = resultObj[key]
            if (resultObj[key].value === botSymbol) allBotSymbols[key] = resultObj[key]
        }

    const stepSymbols = playerStep ? allPlayerSymbols : allBotSymbols

    if (Object.keys(allPlayerSymbols).length >= 3 || Object.keys(allBotSymbols).length >= 3) {

        for (const key in stepSymbols) {
            const line_index = stepSymbols[key].x
            const column_index = stepSymbols[key].y

                // check X-LINE
            const line = Object.values(stepSymbols).filter(item => item.x === line_index).map( item => item['y'] )
                if (line.length >= 3) {
                    for (let i = 0; i < line.length; i++) {
                        if (line[i+1]-line[i] === 1 && line[i+2]-line[i] === 2) {
                            res = {}
                            res[`${line_index}-${line[ i ]}`] = ''
                            res[`${line_index}-${line[i+1]}`] = ''
                            res[`${line_index}-${line[i+2]}`] = ''
                            if (line[i+3]-line[i] === 3) {
                                res[`${line_index}-${line[i+3]}`] = ''
                                    //if (line[i+4]-line[i] === 4) res[`${line_index}-${line[i+4]}`] = ''           // for fieldSize === 5
                            }
                            return res
                        } 
                    }
                }

                // check Y-COLUMN
            const column = Object.values(stepSymbols).filter(item => item.y === column_index).map( item => item['x'] )
                if (column.length >= 3) {
                    for (let i = 0; i < column.length; i++) {
                        if (column[i+1]-column[i] === 1 && column[i+2]-column[i] === 2) {
                            res = {}
                            res[`${column[ i ]}-${column_index}`] = ''
                            res[`${column[i+1]}-${column_index}`] = ''
                            res[`${column[i+2]}-${column_index}`] = ''
                            if (column[i+3]-column[i] === 3) {
                                res[`${column[i+3]}-${column_index}`] = ''
                                    //if (column[i+4]-column[i] === 4) res[`${column[i+4]}-${column_index}`] = ''   // for fieldSize === 5
                            }
                            return res
                        }
                    }
                }

                // check DIAG
            if (stepSymbols[`${line_index+1}-${column_index+1}`] && stepSymbols[`${line_index+2}-${column_index+2}`]) {
                res = {}
                res[key] = ''
                res[`${line_index+1}-${column_index+1}`] = ''
                res[`${line_index+2}-${column_index+2}`] = ''
                if (stepSymbols[`${line_index+3}-${column_index+3}`]) {
                    res[`${line_index+3}-${column_index+3}`] = ''
                    //if (stepSymbols[`${line_index+4}-${column_index+4}`]) res[`${line_index+4}-${column_index+4}`] = ''   // for fieldSize === 5
                }
                return res
            }
            if (stepSymbols[`${line_index+1}-${column_index-1}`] && stepSymbols[`${line_index+2}-${column_index-2}`]) {
                res = {}
                res[key] = ''
                res[`${line_index+1}-${column_index-1}`] = ''
                res[`${line_index+2}-${column_index-2}`] = ''
                if (stepSymbols[`${line_index+3}-${column_index-3}`]) {
                    res[`${line_index+3}-${column_index-3}`] = ''
                    //if (stepSymbols[`${line_index+4}-${column_index-4}`]) res[`${line_index+4}-${column_index-4}`] = ''   // for fieldSize === 5
                }                
                return res
            }

                // NO-WINNER
            if (!res && Object.keys(allPlayerSymbols).length + Object.keys(allBotSymbols).length === Object.keys(resultObj).length)
                return res = 'no_winner'
        }
    }
    return false
}

export default CheckResults