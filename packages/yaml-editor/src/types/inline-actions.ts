import * as monaco from 'monaco-editor'

export interface InlineAction<T> {
  title: string
  onClick: (args: { path: string; range: monaco.IRange; data: T }) => void
  data?: T
}
