import React, {useState, useEffect} from 'react'
import './results.css'
import {connect} from 'react-redux'

function Results(props) {
    const [resultsVisible, setResultsVisible] = useState(false)
    const [resultsDataArr, setResultsDataArr] = useState([])
    const playerName = props.settings.playerName
    const {playerScore, botScore} = props

    const showResults = () => {
        setResultsVisible(!resultsVisible)
    }

    const sendResult = () => {
        if (playerScore-botScore <= 0) {
            alert('Your results are not so good. Play again!')
            return
        }
        fetch('https://cors-anywhere.herokuapp.com/' + 'http://xo.leonovlab.ru/api/results.php', {      // proxy fix problem with CORS
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
            body: `playerName=${playerName}&playerScore=${playerScore-botScore}`
        })
        .then(response => {
            console.log(response)
        })
    }

    useEffect( () => {
        fetch('https://cors-anywhere.herokuapp.com/' + 'http://xo.leonovlab.ru/api/results.php')        // proxy fix problem with CORS
        .then(response => response.json())
        .then(data => {
            const results = data.map( result => 
                <div key={result.id_results}>
                    <p className='result_score'>{result.player_result}</p>
                    <p className='result_name'>{result.player_name}</p>
                </div>
            )
            setResultsDataArr(results)
        })
        .catch(err => {
            const resultsERR = <p style={{textAlign:'center'}}>no results...</p>
            setResultsDataArr(resultsERR)
        })    
    }, [resultsVisible])

    const classResultsWrapper = resultsVisible ? 'resultsWrapper resultsWrapper_show' : 'resultsWrapper resultsWrapper_hide'
    const classResults        = resultsVisible ? 'results_show' : 'results_hide'
    return (
        <div className={classResultsWrapper}>
            <div className='results_btn'>
                <button onClick={showResults} title={resultsVisible ? 'Hide results' : 'Show results'}>櫳</button>
            </div>
            <div className={classResults}>
                <div className='results_item'>
                    <p className='results_title'>Top:</p>
                    <p className='results_scores'>
                        <span>Player </span>
                        <span> Wins</span>
                    </p>
                    {resultsDataArr}
                </div>
                <div className='send_btn'>
                    <button onClick={sendResult} disabled={playerName ? '' : 'disabled'}>send my result</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        playerScore: state.scores.playerScore,
        botScore: state.scores.botScore,
    }
}

export default connect(mapStateToProps)(Results)