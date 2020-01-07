import React, {useState} from 'react'
import './app.css'
import {Provider as SettingsProvider} from '../../contexts/settings'
import Wrapper from '../wrapper'
import Settings from '../settings'
import Results from '../results'
import CurrentResults from '../currentResults' 
import {store} from '../../store'
import {Provider} from 'react-redux'

function App() {
  const [settings, setSettings] = useState({
    'playerName': '',
    'playerSymbol': 'x',
    'fieldSize': 3,   // max field size === 4; for increase this value -> necesarry correct checkResult & botStep functions
    'botSymbol': 'o',//
    'playerStep': true,
  })

  const onSettingsChange = newSettings => setSettings(newSettings)

  const reloadApp = () => setSettings( { ...settings} )

  return (
    <div className="app-wrapper">
      <Provider store={store}>
        <SettingsProvider value={settings}>
          <CurrentResults settings={settings} />
          <Wrapper settings={settings} reloadApp={reloadApp} />
          <Settings onSettingsChange={onSettingsChange} settings={settings} />
          <Results settings={settings} />
        </SettingsProvider>
      </Provider>
      {/* {console.log('render App')} */}
    </div>
  )
}

export default App