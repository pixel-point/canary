import { SelectorType, type InlineAction, type PathSelector } from '@harnessio/yaml-editor'

export type InlineActionArgsType = {
  action: 'stepform' | 'palette'
}

export const getInlineActions = (
  onClick: InlineAction<InlineActionArgsType>['onClick']
): {
  selectors: PathSelector[]
  actions: InlineAction<InlineActionArgsType>[]
}[] => {
  return [
    {
      selectors: [{ type: SelectorType.ContainsPath, basePath: '', paths: [/pipeline$/] }],
      actions: [
        {
          title: 'Open form drawer',
          onClick,
          data: { action: 'stepform' }
        },
        {
          title: 'Open palette drawer',
          onClick,
          data: { action: 'palette' }
        }
      ]
    }
  ]
}
