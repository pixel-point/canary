import { FC, useMemo } from 'react'

import { useTranslationStore } from '@utils/viewUtils'
import { defaultTo } from 'lodash-es'

import { DelegateConnectivityList, SandboxLayout } from '@harnessio/ui/views'

import mockDelegatesList from './mock-delegates-list.json'

const DelegateConnectivityWrapper: FC = () => {
  const delegates = useMemo(
    () =>
      mockDelegatesList.map(delegate => ({
        groupId: delegate.groupId,
        groupName: delegate.groupName,
        lastHeartBeat: delegate.lastHeartBeat,
        activelyConnected: delegate.activelyConnected,
        groupCustomSelectors: delegate.groupCustomSelectors || [],
        groupImplicitSelectors: [...Object.keys(defaultTo(delegate.groupImplicitSelectors, {}))]
      })),
    []
  )

  return (
    <SandboxLayout.Main>
      <SandboxLayout.Content>
        <DelegateConnectivityList
          delegates={delegates}
          useTranslationStore={useTranslationStore}
          isLoading={false}
          selectedTags={[]}
        />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { DelegateConnectivityWrapper }
