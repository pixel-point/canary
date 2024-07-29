import React, { useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import Editor, { useMonaco } from '@monaco-editor/react'
import { loader } from '@monaco-editor/react'
import { useCodeLenses } from '../hooks/useCodeLens'
import { PathSelector } from '../types/selectors'
import { InlineAction } from '../types/inline-actions'
import { useTheme } from '../hooks/useTheme'
import { useSchema } from '../hooks/useSchema'
import { schemaIdToUrl } from '../utils/schema-utils'
import { useProblems } from '../hooks/useProblems'
import { useYamlEditorContext } from './YamlProvider'
import { ThemeDefinition } from '../types/themes'

loader.config({ monaco })

export interface YamlEditorProps {
  value: string
  schemaConfig?: { schema: any; uri: string }
  inlineActions?: { selectors: PathSelector[]; actions: InlineAction[] }[]
  themeConfig?: { rootElementSelector: string; defaultTheme?: string; themes?: ThemeDefinition[] }
}

export function YamlEditor(props: YamlEditorProps): JSX.Element {
  const { value, schemaConfig, inlineActions, themeConfig } = props
  const monaco = useMonaco()
  const [instanceId] = useState(Math.random().toString())
  const { setEditor } = useYamlEditorContext()

  const monacoRef = useRef<typeof monaco>()

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    selectOnLineNumbers: true
  }

  useEffect(() => {
    if (monaco && !monacoRef.current) {
      monacoRef.current = monaco
      // TODO: is there event for this?
      setTimeout(() => {
        setEditor(monacoRef.current?.editor.getEditors()[0]!)
      }, 100)
    }
  }, [monaco])

  useSchema({ monacoRef, schemaConfig, instanceId })

  // useCodeLenses({ monacoRef, inlineActions });

  const { theme } = useTheme({ monacoRef, themeConfig })

  useProblems({ monacoRef })

  return (
    <>
      <Editor
        language="yaml"
        theme={theme}
        value={value}
        options={options}
        path={schemaIdToUrl(instanceId.toString())}
      />
    </>
  )
}
