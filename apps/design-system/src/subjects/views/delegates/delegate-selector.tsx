import { useDelegateData } from '@subjects/views/delegates/hooks'
import { getMatchedDelegatesCount, isDelegateSelected } from '@subjects/views/delegates/utils.ts'
import { useTranslationStore } from '@utils/viewUtils.ts'

import { DelegateSelector as DelegateSelectorComponent } from '@harnessio/ui/views'

import mockTagsList from './mock-tags-list.json'

export const DelegateSelector = () => {
  const delegatesData = useDelegateData()

  return (
    <DelegateSelectorComponent
      delegates={delegatesData}
      getMatchedDelegatesCount={getMatchedDelegatesCount}
      isDelegateSelected={isDelegateSelected}
      tagsList={mockTagsList}
      useTranslationStore={useTranslationStore}
    />
  )
}
