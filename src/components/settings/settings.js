import React, {Component} from 'react'
import './settings.css'

class Settings extends Component {
    state = {
        settingsVisible: false,
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
        const newPlayerSymbol = this.state.playerSymbol === 'x' ? 'o' : 'x'
        const newBotSymbol = newPlayerSymbol === 'x' ? 'o' : 'x'
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

    render () {
        const other_playerSymbol   = this.state.playerSymbol === 'x' ? 'o' : 'x'
        const other_fieldSize      = this.state.fieldSize === 3 ? 4 : 3
        const classSettingsWrapper = this.state.settingsVisible ? 'settingsWrapper settingsWrapper_show' : 'settingsWrapper settingsWrapper_hide'
        const classSettings        = this.state.settingsVisible ? 'settings_show' : 'settings_hide'
            return (
                <div className={classSettingsWrapper}>
                    <div className='settings_btn'>
                        <button onClick={this.showSettings} title={this.state.settingsVisible ? 'Hide settings' : 'Show settings'}>櫳</button>
                    </div>
                    <div className={classSettings}>
                        <div className='settings_item'>
                            <p className='settings_title'>Your name:</p>
                            <form onSubmit={this.set_playerName}>
                                <input
                                    id='playerName'
                                    onChange={event => this.setState({innerPlayerName: event.target.value})}
                                    placeholder='Enter your name'
                                    maxLength='12'
                                    type='text'
                                    value = {this.state.innerPlayerName}
                                >
                                </input>
                                <input type="submit" value="Submit" />
                                {/* <button className='btn' onClick={this.set_playerName} disabled={this.state.innerPlayerName ? '' : 'disabled'}>Set name</button> */}
                            </form>
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
                    {console.log('render Settings')}
                </div>
            )
    }
}

export default Settings