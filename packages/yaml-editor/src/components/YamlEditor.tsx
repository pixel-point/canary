import React, { useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import Editor, { Monaco, useMonaco } from '@monaco-editor/react'
import { loader } from '@monaco-editor/react'
// import { useCodeLenses } from '../hooks/useCodeLens'
import { PathSelector } from '../types/selectors'
import { InlineAction } from '../types/inline-actions'
import { useTheme } from '../hooks/useTheme'
import { useSchema } from '../hooks/useSchema'
import { schemaIdToUrl } from '../utils/schema-utils'
import { useProblems } from '../hooks/useProblems'
import { useYamlEditorContext } from './YamlProvider'
import { ThemeDefinition } from '../types/themes'

loader.config({ monaco })

export interface YamlRevision {
  yaml: string
  revisionId?: number
}

const options: monaco.editor.IStandaloneEditorConstructionOptions = {
  selectOnLineNumbers: true
}

export interface YamlEditorProps {
  yamlRevision: YamlRevision
  onYamlRevisionChange: (yamlRevision: YamlRevision | undefined, ev: monaco.editor.IModelContentChangedEvent) => void
  schemaConfig?: { schema: any; uri: string }
  inlineActions?: { selectors: PathSelector[]; actions: InlineAction[] }[]
  themeConfig?: { rootElementSelector: string; defaultTheme?: string; themes?: ThemeDefinition[] }
}

export function YamlEditor(props: YamlEditorProps): JSX.Element {
  const { yamlRevision, schemaConfig, inlineActions, themeConfig, onYamlRevisionChange } = props
  const monaco = useMonaco()
  const [instanceId] = useState('yaml')
  const { editor, setEditor } = useYamlEditorContext()

  const monacoRef = useRef<typeof monaco>()
  const currentRevisionRef = useRef<YamlRevision>({ yaml: '', revisionId: 0 })

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) {
    editorRef.current = editor
    monacoRef.current = monaco

    editor.setValue(yamlRevision.yaml)

    setEditor(editor)
  }

  // TODO: fix this flow
  useEffect(() => {
    if (editorRef.current) {
      if (!yamlRevision.revisionId || yamlRevision.revisionId > currentRevisionRef.current?.revisionId!) {
        editorRef.current?.setValue(yamlRevision.yaml)
      }
    }
  }, [yamlRevision, editorRef.current])

  useSchema({ schemaConfig, instanceId })

  // useCodeLenses({ monacoRef, inlineActions });

  const { theme } = useTheme({ monacoRef, themeConfig, editor })

  useProblems({ monacoRef })

  return (
    <>
      <Editor
        onChange={(value, data) => {
          currentRevisionRef.current = { yaml: value ?? '', revisionId: data.versionId }
          onYamlRevisionChange({ ...currentRevisionRef.current }, data)
        }}
        language="yaml"
        theme={theme}
        // value={value}
        options={options}
        path={schemaIdToUrl(instanceId)}
        onMount={handleEditorDidMount}
      />
    </>
  )
}
