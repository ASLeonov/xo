import React, {useState, useEffect} from 'react'
import './results.css'
import {connect} from 'react-redux'
import {clearScores} from '../../store/action-creators'

function Results(props) {
    const [resultsVisible, setResultsVisible] = useState(true)
    const [resultsDataArr, setResultsDataArr] = useState([])
    const playerName = props.settings.playerName
    const {playerScore, botScore, reloadApp, clearScores} = props

    const showResults = () => {
        setResultsVisible(!resultsVisible)
    }

    const fetchResults = () => {
        fetch('https://cors-anywhere.herokuapp.com/' + 'http://xo.leonovlab.ru/api/results.php')        // proxy fix problem with CORS
        .then(response => response.json())
        .then(data => {
            const results = data.map(result => 
                <div key={result.id_results} className='results_scores_wrapper'>
                    <p className='result_name'>{result.player_name}</p>
                    <p className='result_score'>{result.player_result}</p>
                </div>
            )
            console.log('fetch Results')
            setResultsDataArr(results)
        })
        .catch(err => {
            const resultsERR = <p style={{textAlign:'center'}}>no results...</p>
            setResultsDataArr(resultsERR)
        })  
    }

    const sendResult = () => {
        if (playerScore-botScore <= 0) {
            alert('Your results are not so good. Play again!')
            return
        }

        clearScores()
        // reloadApp()

        fetch('https://cors-anywhere.herokuapp.com/' + 'http://xo.leonovlab.ru/api/results.php', {      // proxy fix problem with CORS
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
            body: `playerName=${playerName}&playerScore=${playerScore-botScore}`
        })
        .then(setResultsDataArr([]))
        .catch(err => {
            const resultsERR = <p style={{textAlign:'center'}}>no results...</p>
            setResultsDataArr(resultsERR)
        })
    }

    useEffect(() => {
        if (resultsDataArr.length > 0) return
        fetchResults()
    })

    const classResultsWrapper = resultsVisible ? 'resultsWrapper resultsWrapper_show' : 'resultsWrapper resultsWrapper_hide'
    const classResults        = resultsVisible ? 'results_show' : 'results_hide'
    const classResultsScores  = resultsDataArr.length > 0 ? 'results_scores_show' : 'results_scores_hide'
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
                        {resultsDataArr}
                    </div>
                </div>
                <div className='send_btn'>
                    <button onClick={sendResult} disabled={(playerName && playerScore - botScore > 0) ? '' : 'disabled'}>
                        {`Clear scores\n&\nsend my result`}
                    </button>
                </div>
            </div>
            {console.log('render Results', resultsDataArr.length, resultsDataArr)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        playerScore: state.scores.playerScore,
        botScore: state.scores.botScore,
    }
}

export default connect(
    mapStateToProps,
    {clearScores}
)(Results)