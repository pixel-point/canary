import { ThemeDefinition } from '@harnessio/yaml-editor'
import { harnessDarkTheme, harnessLightTheme } from './configurations/theme/theme'
import { DataFlowExample } from './examples/data-flow/DataFlowExample'
import './App.css'

const themes: ThemeDefinition[] = [
  { themeName: 'harness-dark', themeData: harnessDarkTheme },
  { themeName: 'harness-light', themeData: harnessLightTheme }
]

function App() {
  return <DataFlowExample />
}

export default App
