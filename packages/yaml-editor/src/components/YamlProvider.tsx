import React, { useCallback, useState } from 'react'
import type { editor } from 'monaco-editor'
export interface YamlEditorContextInterface {
  markers: editor.IMarker[]
  setMarkers: (markets: editor.IMarker[]) => void
  editor: editor.IEditor | null
  setEditor: (monacoEditor: editor.ICodeEditor) => void
  updateCursorPosition: (position: { column: number; lineNumber: number }) => void
}

export const YamlEditorContext = React.createContext<YamlEditorContextInterface>({
  markers: [],
  setMarkers: () => undefined,
  editor: null,
  setEditor: (_monacoEditor: editor.ICodeEditor) => undefined,
  updateCursorPosition: (_position: { column: number; lineNumber: number }) => undefined
})

export function YamlEditorContextProvider({ children }: React.PropsWithChildren<{}>): React.ReactElement {
  const [markers, setMarkers] = useState<editor.IMarker[]>([])
  const [monacoEditor, setMonacoEditor] = useState<editor.IEditor | null>(null)

  const updateCursorPosition = useCallback(
    (position: { column: number; lineNumber: number }) => {
      monacoEditor?.setPosition(position)
      monacoEditor?.focus()
    },
    [monacoEditor]
  )

  return (
    <YamlEditorContext.Provider
      value={{
        markers,
        setMarkers,
        editor: monacoEditor,
        setEditor: setMonacoEditor,
        updateCursorPosition
      }}>
      {children}
    </YamlEditorContext.Provider>
  )
}

export function useYamlEditorContext(): YamlEditorContextInterface {
  return React.useContext(YamlEditorContext)
}
