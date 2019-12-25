import React, {useState} from 'react'
import './app.css'
import {Provider as SettingsProvider} from '../../contexts/settings'
import Wrapper from '../wrapper'
import Settings from '../settings'

function App() {
  const [settings, setSettings] = useState({
    'playerSymbol': 'x',
    'fieldSize': 3,   // max field size === 5; for increase this value -> necesarry correct checkResult & botStep functions
    'botSymbol': 'o',
    'playerStep': true,
  })
  const onSettingsChange = newSettings => setSettings(newSettings)

  const reloadApp = () => setSettings( { ...settings} )

  return (
    <div className="app-wrapper">
      <SettingsProvider value={settings}>
        <Wrapper settings={settings} reloadApp={reloadApp}/>
        <Settings onSettingsChange={onSettingsChange}/>
      </SettingsProvider>
      {/* {console.log('render App')} */}
    </div>
  )
}

export default App