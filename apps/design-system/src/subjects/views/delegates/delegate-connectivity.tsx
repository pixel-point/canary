import { useTranslationStore } from '@utils/viewUtils'
import { defaultTo } from 'lodash-es'

import { DelegateConnectivityList, isDelegateSelected, SandboxLayout } from '@harnessio/ui/views'

import mockDelegatesList from './mock-delegates-list.json'

const DelegateConnectivityWrapper = (): JSX.Element => (
  <SandboxLayout.Main>
    <SandboxLayout.Content>
      <DelegateConnectivityList
        delegates={mockDelegatesList.map(delegate => ({
          groupId: delegate.groupId,
          groupName: delegate.groupName,
          lastHeartBeat: delegate.lastHeartBeat,
          activelyConnected: delegate.activelyConnected,
          groupCustomSelectors: delegate.groupCustomSelectors || [],
          groupImplicitSelectors: [...Object.keys(defaultTo(delegate.groupImplicitSelectors, {}))]
        }))}
        useTranslationStore={useTranslationStore}
        isLoading={false}
        selectedTags={[]}
        isDelegateSelected={isDelegateSelected}
      />
    </SandboxLayout.Content>
  </SandboxLayout.Main>
)

export { DelegateConnectivityWrapper }
