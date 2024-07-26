import { RefObject, useEffect, useState } from 'react'
import * as monaco from 'monaco-editor'
import { ThemeDefinition } from '../types/themes'

export type UseTheme = (arg: {
  monacoRef: RefObject<typeof monaco | undefined>
  themeConfig?: {
    rootElementSelector: string
    defaultTheme?: string
    themes?: ThemeDefinition[]
  }
}) => { theme: string }

export const useTheme: UseTheme = (props): { theme: string } => {
  const { monacoRef, themeConfig } = props
  const { rootElementSelector, defaultTheme } = themeConfig ?? {}

  const [theme, setTheme] = useState(defaultTheme ?? 'vs-dark')

  useEffect(() => {
    if (!monacoRef.current) return

    const monacoEditor = monacoRef.current?.editor

    themeConfig?.themes?.forEach(theme => {
      monacoEditor.defineTheme(theme.themeName, theme.themeData)
    })
  }, [monacoRef])

  useEffect(() => {
    const monacoEditor = monacoRef.current?.editor

    if (!monacoEditor) return
    if (!themeConfig?.rootElementSelector) return

    const targetNode = document.querySelector(themeConfig.rootElementSelector)

    if (!targetNode) return

    const config = { attributes: true, childList: false, subtree: false }

    const callback = () => {
      const newTheme = targetNode.classList.contains('harness-dark') ? 'harness-dark' : 'harness-light'

      if (theme !== newTheme) {
        setTheme(newTheme)

        const monacoEditor = monacoRef.current?.editor
        monacoEditor?.setTheme(newTheme)
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)

    return () => {
      observer.disconnect()
    }
  })

  return { theme }
}
