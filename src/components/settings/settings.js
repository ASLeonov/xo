import React, {Component} from 'react'
import './settings.css'

class Settings extends Component {
    state = {
        settingsVisible: true,
        playerName: this.props.settings.playerName,
        playerSymbol: this.props.settings.playerSymbol,
        botSymbol: this.props.settings.botSymbol,
        fieldSize: this.props.settings.fieldSize,
        innerPlayerName: '',
    }

    showSettings = () => {
        this.setState({
            settingsVisible: !this.state.settingsVisible,
        })
    }
    
    set_playerName = () => {
        const new_playerName = this.state.innerPlayerName.trim()
        if (!new_playerName) return this.setState({innerPlayerName: ''})
            this.setState({
                playerName: new_playerName,
                innerPlayerName: new_playerName,
            })
            this.props.onSettingsChange({
                'playerName': new_playerName,
                'playerSymbol': this.state.playerSymbol,
                'fieldSize': this.state.fieldSize,
                'botSymbol': this.state.botSymbol,
                'playerStep': 'true',
            })
    }

    change_playerSymbol = () => {
        const newPlayerSymbol = this.state.playerSymbol === 'X' ? 'O' : 'X'
        const newBotSymbol = newPlayerSymbol === 'X' ? 'O' : 'X'
        this.setState({
            playerSymbol: newPlayerSymbol,
            botSymbol: newBotSymbol
        })
        this.props.onSettingsChange({
            'playerName': this.state.playerName,
            'playerSymbol': newPlayerSymbol,
            'fieldSize': this.state.fieldSize,
            'botSymbol': newBotSymbol,
            'playerStep': 'true',
        })
    }

    change_fieldSize = () => {
        const newSize = this.state.fieldSize === 3 ? 4 : 3
        this.setState({
            fieldSize: newSize
        })
        this.props.onSettingsChange({
            'playerName': this.state.playerName,
            'playerSymbol': this.state.playerSymbol,
            'fieldSize': newSize,
            'botSymbol': this.state.botSymbol,
            'playerStep': 'true',
        })
    }

    changer = e => this.setState({innerPlayerName: e})

    render () {
        const other_playerSymbol   = this.state.playerSymbol === 'X' ? 'O' : 'X'
        const other_fieldSize      = this.state.fieldSize === 3 ? 4 : 3
        const classSettingsWrapper = this.state.settingsVisible ? 'settingsWrapper settingsWrapper_show' : 'settingsWrapper settingsWrapper_hide'
        const classSettings        = this.state.settingsVisible ? 'settings_show' : 'settings_hide'
            return (
                <div className={classSettingsWrapper}>
                    <div className='settings_btn'>
                        <button onClick={this.showSettings} title={this.state.settingsVisible ? 'Hide settings' : 'Show settings'}>
                            {this.state.settingsVisible ? <div className='settings_btn_hide'>hide</div> : 'Ⓢ'}
                        </button>
                    </div>
                    <div className={classSettings}>
                        <div className='settings_item'>
                            <p className='settings_title'>Your name:</p>
                                <div className='input_wrapper'>
                                    <input
                                        id='playerName'
                                        onChange={event => this.setState({innerPlayerName: event.target.value.substr(0,12)})}   // substr fix bug with <input> maxlength on android
                                        placeholder='Enter your name'
                                        maxLength='12'
                                        type='text'
                                        value = {this.state.innerPlayerName}
                                    >
                                    </input>
                                    <div className={`input_ok ${this.state.playerName && this.state.playerName === this.state.innerPlayerName ? '' : 'input_ok_hide'}`}>✓</div>
                                </div>
                                <button
                                    className='btn'
                                    onClick={this.set_playerName}
                                    disabled={this.state.innerPlayerName && this.state.playerName !== this.state.innerPlayerName ? '' : 'disabled'}
                                >
                                    Set name
                                </button>
                        </div>
                        <div className='settings_item'>
                            <p className='settings_title'>Your game chip:</p>
                            <p className='settings_symbols_active'>{this.state.playerSymbol}</p>
                            <p className='settings_symbols'onClick={this.change_playerSymbol}>{other_playerSymbol}</p>
                        </div>
                        <div className='settings_item'>
                            <p className='settings_title'>Field size:</p>
                            <p className='settings_symbols_active'>{this.state.fieldSize}</p>
                            <p className='settings_symbols'onClick={this.change_fieldSize}>{other_fieldSize}</p>
                        </div>
                    </div>
                    {/* {console.log('render Settings')} */}
                </div>
            )
    }
}

export default Settings