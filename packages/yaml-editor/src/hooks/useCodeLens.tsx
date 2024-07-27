import { RefObject, useEffect } from 'react'
import * as monaco from 'monaco-editor'
import { PathSelector } from '../types/selectors'
import { InlineAction } from '../types/inline-actions'
import { getOutlineModel, processOutlineModel } from '../utils/outline-model-to-path'
import { getCodeLens } from './utils'

export type UseCodeLenses = (arg: {
  monacoRef: RefObject<typeof monaco | undefined>
  inlineActions?: { selectors: PathSelector[]; actions: InlineAction[] }[]
}) => void

export const useCodeLenses: UseCodeLenses = ({ monacoRef, inlineActions }): void => {
  useEffect(() => {
    if (!monacoRef.current) return

    const disposable = monaco.languages.registerCodeLensProvider('yaml', {
      provideCodeLenses: async model => {
        const outlineModel = await getOutlineModel(model)

        const pathSymbolMap = processOutlineModel(outlineModel)

        const commandId = monacoRef?.current?.editor?.addCommand({
          id: '0',
          run: ({ range, symbols, onClick, args }) => {
            const path = 'TODO ...' //getPathFromRange(range, symbols);
            onClick({ path, range }, ...(args ? args : []))
          }
        })

        if (!commandId) return

        const lenses = getCodeLens({ pathSymbolMap, inlineActions, commandId })

        return {
          lenses,
          dispose: () => undefined
        }
      }
    })

    return disposable.dispose
  }, [inlineActions, monacoRef])
}
