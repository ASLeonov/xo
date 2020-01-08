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