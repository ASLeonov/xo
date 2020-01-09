import React, {useState, useEffect} from 'react'
import './results.css'
import {connect} from 'react-redux'
import {clearScores, getResults} from '../../store/action-creators'

function Results(props) {
    const [resultsVisible, setResultsVisible] = useState(true)
    const playerName = props.settings.playerName
    const {playerScore, botScore, results, reloadApp, clearScores, getResults} = props

    const showResults = () => {
        setResultsVisible(!resultsVisible)
    }

    const sendResult = () => {
        clearScores()
        reloadApp()

        fetch('https://cors-anywhere.herokuapp.com/' + 'http://xo.leonovlab.ru/api/results.php', {      // proxy fix problem with CORS
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
            body: `playerName=${playerName}&playerScore=${playerScore-botScore}`
        })
        .then(getResults())
        .catch(e => getResults())
    }

    useEffect(() => {
       !results['loader'] && !results['data'] && getResults()
    })

    const classResultsWrapper = resultsVisible ? 'resultsWrapper resultsWrapper_show' : 'resultsWrapper resultsWrapper_hide'
    const classResults        = resultsVisible ? 'results_show' : 'results_hide'
    const classResultsScores  = results['loader'] ? 'results_scores' : (results['data'] ? 'results_scores_show' : 'results_scores_hide')
    const classSendBtn        = results['loader'] ? 'send_btn_hide' : 'send_btn'
    return (
        <div className={classResultsWrapper}>
            <div className='results_btn'>
                <button onClick={showResults} title={resultsVisible ? 'Hide results' : 'Show results'}>櫳</button>
            </div>
            <div className={classResults}>
                <div className='results'>
                    <p className='results_title'>Top:</p>
                    <p className='results_caption'>
                        <span>Player </span>
                        <span> Wins</span>
                    </p>
                    <div className={classResultsScores}>
                        {results['loader']}
                        {results['data']}
                        <div className={classSendBtn}>
                            <button
                                onClick={sendResult}
                                disabled={(playerName && playerScore - botScore > 0) ? '' : 'disabled'}
                            >
                                {`Clear scores\n&\nsave my result`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {console.log('render Results')}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        playerScore: state.scores.playerScore,
        botScore: state.scores.botScore,
        results: state.results,
    }
}

export default connect(
    mapStateToProps,
    {clearScores, getResults}
)(Results)