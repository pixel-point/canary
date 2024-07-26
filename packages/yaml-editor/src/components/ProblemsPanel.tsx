import React from 'react'
import { useYamlEditorContext } from './YamlProvider'
import * as monaco from 'monaco-editor'
import { MarkerSeverity } from 'monaco-editor'
import { Problems, Problem, Severity } from './Problems'

const markerSeverity2ProblemSeverity = (severity: MarkerSeverity): Severity => {
  switch (severity) {
    case monaco.MarkerSeverity.Error:
      return Severity.ERROR
    case monaco.MarkerSeverity.Warning:
      return Severity.WARNING
    case monaco.MarkerSeverity.Hint:
    case monaco.MarkerSeverity.Info:
      return Severity.INFO
  }
}

export function ProblemsPanel(): JSX.Element {
  const { markers, updateCursorPosition } = useYamlEditorContext()

  const problems: Problem<monaco.editor.IMarker>[] = markers.map(marker => {
    return {
      message: marker.message,
      position: {
        row: marker.startLineNumber,
        column: marker.startColumn
      },
      severity: markerSeverity2ProblemSeverity(marker.severity),
      data: marker
    }
  })
  return (
    <Problems
      problems={problems}
      onClick={problem => {
        if (problem.data?.startLineNumber && problem.data?.startColumn) {
          updateCursorPosition({
            lineNumber: problem.data?.startLineNumber,
            column: problem.data?.startColumn
          })
        }
      }}
    />
  )
}
