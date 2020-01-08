export const scoresReducer = (scoresState = {playerScore:0, botScore:0}, action) => {

  switch (action.type) {
    case 'INCREMENT_PLAYER_SCORE': {
        return {
            playerScore: scoresState.playerScore + 1,
            botScore: scoresState.botScore,
        }
    }
    case 'INCREMENT_BOT_SCORE': {
        return {
            playerScore: scoresState.playerScore,
            botScore: scoresState.botScore + 1,
        }
    }
    case 'CLEAR_SCORES': {
        return {
            playerScore: 0,
            botScore: 0,
        }
    }
    default: {
        return scoresState
    }
  }
}