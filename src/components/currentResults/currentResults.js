import React from 'react'
import './currentResults.css'
import {connect} from 'react-redux'

function CurrentResults(props) {
    const {playerScore, botScore} = props

    return (
        <div className='currentResults'>
            <h2>Current results:</h2>
                <div className='currentResults_scores'>
                    <h3>
                        {props.settings.playerName ? props.settings.playerName : 'Player'}: {playerScore}
                    </h3>
                    <h3>
                        BOT: {botScore}
                    </h3>
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

export default connect(
    mapStateToProps,
)(CurrentResults)