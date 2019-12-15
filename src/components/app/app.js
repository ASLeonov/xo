import React, {useState} from 'react'
import './app.css'
import {Provider as SettingsProvider} from '../../contexts/settings'
import Field from '../field'
import Settings from '../settings'

function App() {
  const [settings, setSettings] = useState({'symbol':'x', 'size':3})

  const onSettingsChange = (settings) => {
    setSettings(settings)
  }

  const checkResult = result => {
    setSettings(result)
  }

  return (
    <div className="app-wrapper">
      <SettingsProvider value={settings}>
        <Field fieldSize={settings.size} checkResult={checkResult} />
        <Settings onSettingsChange={onSettingsChange}/>
      </SettingsProvider>
    </div>
  )
}

export default App
