import React, { useState } from 'react'
import { ThemeDefinition, YamlEditor } from '@harnessio/yaml-editor'
import { useDataContext } from './DataProvider'
import unifiedSchema from '../../configurations/schema/unified.json'
import { harnessDarkTheme, harnessLightTheme } from '../../configurations/theme/theme'
import { stageApproval } from '../../configurations/pipeline/stage-approval'

import { ILanguageFeaturesService } from 'monaco-editor/esm/vs/editor/common/services/languageFeatures.js'
import { OutlineModel } from 'monaco-editor/esm/vs/editor/contrib/documentSymbols/browser/outlineModel.js'
import { StandaloneServices } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js'
import { inlineActionExample } from '../../configurations/inline-actions/inline-actions-def'

const themes: ThemeDefinition[] = [
  { themeName: 'harness-dark', themeData: harnessDarkTheme },
  { themeName: 'harness-light', themeData: harnessLightTheme }
]

const schemaConfig = {
  schema: unifiedSchema,
  uri: 'https://raw.githubusercontent.com/bradrydzewski/spec/master/dist/schema.json'
}

const themeConfig = {
  rootElementSelector: '#root',
  defaultTheme: 'harness-dark',
  themes
}

export const YamlEditorWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { yamlRevision, setYamlRevision } = useDataContext()
  const [showYamlEditor, setShowYamlEditor] = useState(true)

  return (
    <>
      <div>
        <button
          onClick={() => {
            setYamlRevision({ yaml: stageApproval })
          }}>
          Update yaml
        </button>
        <button
          onClick={() => {
            setShowYamlEditor(!showYamlEditor)
          }}>
          Toggle mount
        </button>
      </div>
      <div style={{ display: 'flex', height: '500px' }}>
        {showYamlEditor && (
          <YamlEditor
            onYamlRevisionChange={(value, data) => {
              setYamlRevision(value ?? { yaml: '', revisionId: 0 })
            }}
            yamlRevision={yamlRevision}
            schemaConfig={schemaConfig}
            inlineActions={inlineActionExample}
            themeConfig={themeConfig}
          />
        )}
      </div>
    </>
  )
}
