export const resultsReducer = (resultsState = {loader:null, data:null}, action) => {
    switch (action.type) {
      case 'GET_RESULTS_SUCCESS': {
        return {
          loader: null,
          data: action.response,
        }
      }
      case 'GET_RESULTS_LOADING': {
        return {
          loader: action.loader,
          data: null,
        }
      }
      case 'GET_RESULTS_FAIL': {
        return {
          loader: null,
          data: action.fail,
        }
      }
      default: {
        return resultsState
      }
    }
  }