export const addPlayerScore = () => {
    return {
        type: 'INCREMENT_PLAYER_SCORE',
    }
}

export const addBotScore = () => {
    return {
        type: 'INCREMENT_BOT_SCORE',
    }
}

export const clearScores = () => {
    return {
        type: 'CLEAR_SCORES',
    }
}

export const getResults = () => {
    return {
        type: 'GET_RESULTS',
        callGetApi: 'https://cors-anywhere.herokuapp.com/http://xo.leonovlab.ru/api/results.php',  // proxy fix problem with CORS
    }
}