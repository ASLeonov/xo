export const BotStep = props => {
    const {fieldSize, freeBlocks, resultObj, playerSymbol, botSymbol, createBlock} = props
    let next = false

    const setBotSymbol = targetBlock => {
        delete freeBlocks[targetBlock]
        resultObj[targetBlock].value = botSymbol
        return createBlock(targetBlock)
    }

        // first Bot step if filedSize === 3
    if (fieldSize === 3 && Object.keys(freeBlocks).length >= 8) {
        if (resultObj['2-2'].value === '-') return setBotSymbol('2-2')      // if center is free                                  
        const corners = ['1-1', '1-3', '3-1', '3-3']                        // if center is busy
        const random_item = Math.floor(Math.random()*3)
        const need_value = corners[random_item]
        return setBotSymbol(need_value)
    }

        // next Bot steps
    const allPlayerSymbols = {}
    const allBotSymbols = {}
           for (const key in resultObj) {
            if (resultObj[key].value === playerSymbol) allPlayerSymbols[key] = resultObj[key]
            if (resultObj[key].value === botSymbol) allBotSymbols[key] = resultObj[key]
        }
    const finalSteps = stepSymbols => {
        next = false
        for (const key in stepSymbols) {
            const line_index = stepSymbols[key].x
            const column_index = stepSymbols[key].y
    
                // check X-LINE
            const line = Object.values(stepSymbols).filter(item => item.x === line_index).map(item => item['y'])
            if (line.length > 1) {
                for (let i = 0; i < line.length; i++) {
                    const lineKey_plus1 = `${line_index}-${line[i]+1}`                  // empty field between symbols
                    if (line[i+1]-line[i] === 2 && lineKey_plus1 in freeBlocks)
                        return setBotSymbol(lineKey_plus1)
                    const lineKey_plus2  = `${line_index}-${line[i]+2}`                 // two field with symbols together
                    const lineKey_minus1 = `${line_index}-${line[i]-1}`
                    if (line[i+1]-line[i] === 1 && lineKey_plus2 in freeBlocks)
                        return setBotSymbol(lineKey_plus2)
                    if (line[i+1]-line[i] === 1 && lineKey_minus1 in freeBlocks)
                        return setBotSymbol(lineKey_minus1)
                }
            }
    
                // check Y-LINE
            const column = Object.values(stepSymbols).filter(item => item.y === column_index).map( item => item['x'] )
            if (column.length > 1) {
                for (let i = 0; i < column.length; i++) {
                    const columnKey_plus1 = `${column[i]+1}-${column_index}`                // empty field between symbols
                    if (column[i+1]-column[i] === 2 && columnKey_plus1 in freeBlocks)
                        return setBotSymbol(columnKey_plus1)
                    const columnKey_plus2  = `${column[i]+2}-${column_index}`               // two field with symbols together
                    const columnKey_minus1 = `${column[i]-1}-${column_index}`
                    if (column[i+1]-column[i] === 1 && columnKey_plus2 in freeBlocks)
                        return setBotSymbol(columnKey_plus2)
                    if (column[i+1]-column[i] === 1 && columnKey_minus1 in freeBlocks)
                        return setBotSymbol(columnKey_minus1)
                }
            }

                // check DIAG
                const diagKey      = `${line_index}-${column_index}`                                       
                const diagKey_SE_1 = `${line_index+1}-${column_index+1}`                                       
                const diagKey_SE_2 = `${line_index+2}-${column_index+2}`
                const diagKey_NW_1 = `${line_index-1}-${column_index-1}`
                const diagKey_SW_1 = `${line_index+1}-${column_index-1}`
                const diagKey_SW_2 = `${line_index+2}-${column_index-2}`
                const diagKey_NE_1 = `${line_index-1}-${column_index+1}`
                                                                                            // empty field between symbols
            if (diagKey_SE_2 in resultObj && diagKey_SE_1 in freeBlocks)                        // '\' style diag             
                if (resultObj[diagKey].value === resultObj[diagKey_SE_2].value)
                    return setBotSymbol(diagKey_SE_1)
            if (diagKey_SW_2 in resultObj && diagKey_SW_1 in freeBlocks)                        // '/' style diag
                if (resultObj[diagKey].value === resultObj[diagKey_SW_2].value)
                    return setBotSymbol(diagKey_SW_1)
                                                                                            // two field with symbols together
            if (diagKey_SE_1 in resultObj) {                                                    // '\' style diag
                if (resultObj[diagKey].value === resultObj[diagKey_SE_1].value) {
                    if (diagKey_NW_1 in freeBlocks) return setBotSymbol(diagKey_NW_1)
                    if (diagKey_SE_2 in freeBlocks) return setBotSymbol(diagKey_SE_2)
                }
            }      
            if (diagKey_SW_1 in resultObj) {                                                    // '/' style diag
                if (resultObj[diagKey].value === resultObj[diagKey_SW_1].value) {
                    if (diagKey_SW_2 in freeBlocks) return setBotSymbol(diagKey_SW_2)
                    if (diagKey_NE_1 in freeBlocks) return setBotSymbol(diagKey_NE_1)
                }
            }      
        }
        next = true
    }

    const otherSteps = () => {
        const randomStep = () => {
            const random_item = Math.floor(Math.random()*Object.keys(freeBlocks).length)
            const all_keys = Object.keys(freeBlocks)
            if (all_keys.length > 0) {
                const need_value = all_keys[random_item]
                return setBotSymbol(need_value)
            }
        }

        if (fieldSize === 3) return randomStep()

        if (fieldSize > 3) {
            if (Object.keys(allBotSymbols).length === 0) return randomStep()        // first Bot step if fieldsize is big

            const firstBot_x = resultObj[Object.keys(allBotSymbols)[0]].x
            const firstBot_y = resultObj[Object.keys(allBotSymbols)[0]].y

            let secondBot_x, secondBot_y
            if (firstBot_x >= 4) {secondBot_x = firstBot_x - 1} else {secondBot_x = firstBot_x + 1}
            if (firstBot_y >= 4) {secondBot_y = firstBot_y - 1} else {secondBot_y = firstBot_y + 1}

            if (`${secondBot_x}-${secondBot_y}` in freeBlocks) return setBotSymbol(`${secondBot_x}-${secondBot_y}`)
            return randomStep()
        }
    }

            finalSteps(allBotSymbols)        // check the final step for Bot win
    next && finalSteps(allPlayerSymbols)     // check the final step for Player win
    next && otherSteps()                     // other step
    
}