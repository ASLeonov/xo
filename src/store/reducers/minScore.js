export const minScoreReducer = (minScoreState = 0, action) => {
    switch (action.type) {
      case 'GET_RESULTS_SUCCESS': {
        return action.minScore
      }
      case 'GET_RESULTS_FAIL': {
        return 99999
      }
      default: {
        return minScoreState
      }
    }
  }