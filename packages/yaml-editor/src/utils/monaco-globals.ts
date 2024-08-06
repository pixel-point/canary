import { ILanguageFeaturesService } from 'monaco-editor/esm/vs/editor/common/services/languageFeatures.js'
import { OutlineModel } from 'monaco-editor/esm/vs/editor/contrib/documentSymbols/browser/outlineModel.js'
import { StandaloneServices } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js'

export interface MonacoGlobalsData {
  ILanguageFeaturesService: typeof ILanguageFeaturesService
  OutlineModel: typeof OutlineModel
  StandaloneServices: typeof StandaloneServices
}

export class MonacoGlobals {
  static data: MonacoGlobalsData = {} as MonacoGlobalsData

  static set(data: MonacoGlobalsData) {
    MonacoGlobals.data = data
  }

  static get(): MonacoGlobalsData {
    return MonacoGlobals.data
  }
}
