import React, {useState} from 'react'
import './app.css'
import {Provider as SettingsProvider} from '../../contexts/settings'
import Wrapper from '../wrapper'
import Settings from '../settings'

function App() {
  const [settings, setSettings] = useState({
    'playerSymbol': 'x',
    'fieldSize': 3,
    'botSymbol': 'o',
    'playerStep': 'true',
  })

  const onSettingsChange = (newSettings) => {
    setSettings(newSettings)
  }

  const reloadApp = () => {
    setSettings( { ...settings} )
  }

  return (
    <div className="app-wrapper">
      <SettingsProvider value={settings}>

        <Wrapper settings={settings}/>

        <Settings onSettingsChange={onSettingsChange}/>

          <div className='reload' onClick={reloadApp}>
            Начать заново
          </div>

      </SettingsProvider>
    </div>
  )
}

export default App
