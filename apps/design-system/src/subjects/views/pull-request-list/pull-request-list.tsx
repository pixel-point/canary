import { FC, useCallback } from 'react'

import { noop, useTranslationStore } from '@utils/viewUtils'

import { PullRequestList, PullRequestPageProps } from '@harnessio/ui/views'

import { pullRequestListStore } from './pull-request-list-store'

const PullRequestListWrapper: FC<Partial<PullRequestPageProps>> = props => {
  const usePullRequestListStore = useCallback(
    () => ({
      ...pullRequestListStore
    }),
    []
  )

  return (
    <PullRequestList
      setSearchQuery={noop}
      usePullRequestListStore={usePullRequestListStore}
      useTranslationStore={useTranslationStore}
      isLoading={false}
      {...props}
    />
  )
}

export default PullRequestListWrapper
