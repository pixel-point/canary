import { YamlEditorContextProvider, YamlEditor, ProblemsPanel } from '@harnessio/yaml-editor'

import { stageApproval } from './configurations/pipeline/stage-approval'
import { inlineActionExample } from './configurations/inline-actions/inline-actions-def'
import unifiedSchema from './configurations/schema/unified.json'
import './App.css'
import { ThemeDefinition } from '@harnessio/yaml-editor'
import { harnessDarkTheme, harnessLightTheme } from './configurations/theme/theme'

const themes: ThemeDefinition[] = [
  { themeName: 'harness-dark', themeData: harnessDarkTheme },
  { themeName: 'harness-light', themeData: harnessLightTheme }
]

function App() {
  const toggleTheme = () => {
    const element = document.querySelector('#root')
    element?.classList.toggle('harness-dark')
  }

  return (
    <div className="bg-black height-100 h-screen flex flex-col">
      <button className="bg-gray-400" onClick={toggleTheme}>
        Toggle theme
      </button>

      <YamlEditorContextProvider>
        <div style={{ display: 'flex', height: '500px' }}>
          <YamlEditor
            value={stageApproval}
            schemaConfig={{
              schema: unifiedSchema,
              uri: 'https://raw.githubusercontent.com/bradrydzewski/spec/master/dist/schema.json'
            }}
            inlineActions={inlineActionExample}
            themeConfig={{
              rootElementSelector: '#root',
              defaultTheme: 'harness-dark',
              themes
            }}
          />{' '}
        </div>
        <ProblemsPanel />
      </YamlEditorContextProvider>
    </div>
  )
}

export default App
