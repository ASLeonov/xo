import React, {Component} from 'react'
// import {Drawer, Button} from 'antd'
import './settings.css'

class Settings extends Component {
    state = {
        settingsVisible: false,         // Подумать про fadeIn - fadeOut...
        playerName: this.props.settings.playerName,
        playerSymbol: this.props.settings.playerSymbol,
        botSymbol: this.props.settings.botSymbol,
        fieldSize: this.props.settings.fieldSize,
    }

    showSettings = () => {
        this.setState({
            settingsVisible: !this.state.settingsVisible,
        })
    }

    set_playerName = () => {
        const new_playerName = document.getElementById('playerName').value
        this.setState({
            playerName: new_playerName,
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
        const newPlayerSymbol = this.state.playerSymbol === '✘' ? 'o' : '✘'
        const newBotSymbol = newPlayerSymbol === '✘' ? 'o' : '✘'
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
        const other_playerSymbol   = this.state.playerSymbol === '✘' ? 'o' : '✘'
        const other_fieldSize      = this.state.fieldSize === 3 ? 4 : 3
        const classSettingsWrapper = this.state.settingsVisible ? 'settingsWrapper settingsWrapper_show' : 'settingsWrapper settingsWrapper_hide'
        const classSettings        = this.state.settingsVisible ? 'settings_show' : 'settings_hide'
            return (
                <div className={classSettingsWrapper}>
                    <div className='btn'>
                        <button onClick={this.showSettings}>櫳</button>
                    </div>
                    <div className={classSettings}>
                        <div className='settings_item'>
                            <p className='settings_title'>Ваше имя</p>
                            <input id='playerName' placeholder='Enter your name' maxLength='12' type='text' onChange={this.set_playerName}>
                            </input>
                        </div>
                        <div className='settings_item'>
                            <p className='settings_title'>Вы играете:</p>
                            <p className='settings_symbols_active'>{this.state.playerSymbol}</p>
                            <p className='settings_symbols'onClick={this.change_playerSymbol}>{other_playerSymbol}</p>
                        </div>
                        <div className='settings_item'>
                            <p className='settings_title'>Размер поля:</p>
                            <p className='settings_symbols_active'>{this.state.fieldSize}</p>
                            <p className='settings_symbols'onClick={this.change_fieldSize}>{other_fieldSize}</p>
                        </div>
                    </div>
                    {/* {console.log('render settings')} */}
                </div>
            )
    }
}

export default Settings