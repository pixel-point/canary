import { ThemeDefinition } from '@harnessio/yaml-editor'
import { editor } from 'monaco-editor'

const harnessLightTheme = {
  base: 'vs' as editor.BuiltinTheme,
  inherit: true,
  rules: [],
  colors: {}
}

const harnessDarkTheme = {
  base: 'vs-dark' as editor.BuiltinTheme,
  inherit: true,
  rules: [
    {
      background: '#0F0F11', // minimap background
      token: ''
    },
    {
      foreground: '#5F97ED', // property name
      token: 'type'
    },
    {
      foreground: '#E29B36', // strings value
      token: 'string'
    },
    {
      foreground: '#E29B36', // number value
      token: 'number'
    }
  ],
  colors: {
    'editor.foreground': '#5F97ED', // in yaml this is applied to -, :
    'editor.background': '#0F0F11', /// background
    //"editor.selectionBackground": "", // selection background
    //"editor.lineHighlightBackground": "", // current line highlight bg
    //"editorCursor.foreground": "", // cursor color
    'editorBracketHighlight.foreground1': '#E29B36', // square brackets
    'editorLineNumber.foreground': '#303036', // line number color
    'editorLineNumber.activeForeground': '#CCCCCC' //active line number color
    // 'editorIndentGuide.background': '#439911', // WARN: this does not work
    // 'editorIndentGuide.activeBackground': '#129912' // WARN: this does not work
  }
}

export const themes: ThemeDefinition[] = [
  { themeName: 'dark', themeData: harnessDarkTheme },
  { themeName: 'light', themeData: harnessLightTheme }
]
