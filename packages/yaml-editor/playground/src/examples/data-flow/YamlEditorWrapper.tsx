import React from 'react'
import { ThemeDefinition, YamlEditor } from '@harnessio/yaml-editor'
import { useDataContext } from './DataProvider'
import unifiedSchema from '../../configurations/schema/unified.json'
import { harnessDarkTheme, harnessLightTheme } from '../../configurations/theme/theme'
import { stageApproval } from '../../configurations/pipeline/stage-approval'

const themes: ThemeDefinition[] = [
  { themeName: 'harness-dark', themeData: harnessDarkTheme },
  { themeName: 'harness-light', themeData: harnessLightTheme }
]

export const YamlEditorWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { yamlRevision, setYamlRevision } = useDataContext()

  return (
    <>
      <div>
        <button
          onClick={() => {
            setYamlRevision({ yaml: stageApproval })
          }}>
          Update yaml
        </button>
      </div>
      <div style={{ display: 'flex', height: '500px' }}>
        <YamlEditor
          onYamlRevisionChange={(value, data) => {
            setYamlRevision(value ?? { yaml: '', revisionId: 0 })
          }}
          yamlRevision={yamlRevision}
          schemaConfig={{
            schema: unifiedSchema,
            uri: 'https://raw.githubusercontent.com/bradrydzewski/spec/master/dist/schema.json'
          }}
          // inlineActions={inlineActionExample}
          themeConfig={{
            rootElementSelector: '#root',
            defaultTheme: 'harness-dark',
            themes
          }}
        />
      </div>
    </>
  )
}
