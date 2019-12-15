import React, {Component} from 'react'
// import {Drawer, Button} from 'antd'
import './settings.css'

class Settings extends Component {
    state = {
        settingsVisible: false,         // Подумать про fadeIn - fadeOut...
        playerSymbol: 'x',
        fieldSize: 3,
    }

    showSettings = () => {
        this.setState({
            settingsVisible: !this.state.settingsVisible,
        })
    }

    change_playerSymbol = () => {
        const newSymbol = this.state.playerSymbol === 'x' ? 'o' : 'x'
        this.setState({
            playerSymbol: newSymbol
        })
        this.props.onSettingsChange({'symbol':newSymbol, 'size':this.state.fieldSize})
    }

    change_fieldSize = () => {
        const newSize = this.state.fieldSize === 3 ? 5 : 3
        this.setState({
            fieldSize: newSize
        })
        this.props.onSettingsChange({'symbol':this.state.playerSymbol, 'size':newSize})
    }

    render () {
        const other_playerSymbol   = this.state.playerSymbol === 'x' ? 'o' : 'x'                             // {console.log('Символ Settings =>', this.state.playerSymbol)}
        const other_fieldSize   = this.state.fieldSize === 3 ? 5 : 3
        const classSettingsWrapper = this.state.settingsVisible ? 'settingsWrapper settingsWrapper_show' : 'settingsWrapper settingsWrapper_hide'
        const classSettings        = this.state.settingsVisible ? 'settings_show' : 'settings_hide'
            return (
                <div className={classSettingsWrapper}>
                    <div className='btn'>
                        <button onClick={this.showSettings}>櫳</button>
                    </div>
                    <div className={classSettings}>
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
                </div>
            )
    }
}

export default Settings