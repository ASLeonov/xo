import React from 'react'

function FieldDecorator(OriginalComponent) {
    return props => {
      // console.log('render Field decorator ---')

        // const {playerSymbol, botSymbol} = props.settings

        // const info = {'gameOn': false, 'result':''}

        // const fieldStyleCSS = {
        //     'width': fieldSize*100,
        //     'height': fieldSize*100,
        // }

        // const resultObj = {}
        // for (let i = 0; i < fieldSize; i++) {
        //     for (let k = 0; k < fieldSize; k++) {
        //       const key = `${i+1}-${k+1}`
        //       const newObj = {}
        //         newObj['id'] = key
        //         newObj['value'] = '-'
        //         newObj['x'] = k+1
        //         newObj['y'] = i+1
        //         resultObj[key] = newObj
        //     }
        // }

        // const freeBlocks = {}
        // for (let key in resultObj) {
        //   if (resultObj[key].value === '-') freeBlocks[key] = ''
        // }       
  
      return (
        <OriginalComponent
            // playerSymbol={playerSymbol}
            // botSymbol={botSymbol}
            {...props}
            // fieldStyleCSS={fieldStyleCSS}
            // resultObj={resultObj}
            // freeBlocks={freeBlocks}
            // info={info}
        />
      )
    }
}
  
  export default FieldDecorator