import { useMemo } from 'react'

import mockDelegatesList from '@subjects/views/delegates/mock-delegates-list.json'
import { defaultTo } from 'lodash-es'

export const useDelegateData = () =>
  useMemo(
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
