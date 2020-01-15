import React from 'react'
import Loader from '../../components/loader'

export default store => next => action => {
    const {callGetApi, ...rest} = action
  
    if (!callGetApi) {
      return next(rest)
    }

    store.dispatch({
        ...rest,
        type: action.type + '_LOADING',
        loader: <Loader key='loader'/>
    })

    setTimeout(() => 
        fetch(callGetApi)
        .then(res => res.json())
        .then(res => 
            next({
                ...rest,
                type: action.type + '_SUCCESS',
                response: res.map(result => 
                    <div key={result.id_results} className='results_scores_wrapper'>
                        <p className='result_name'>{result.player_name}</p>
                        <p className='result_score'>{result.player_result}</p>
                    </div>
                ),
                minScore: res[res.length-1].player_result,
            })
        )
        .catch(e => {
            store.dispatch({
                ...rest,
                type: action.type + '_FAIL',
                error: e,
            fail: <div style={{textAlign:'center'}}> no results ...</div>
            })
        })
    ,2900)
}