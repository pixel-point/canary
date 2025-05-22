import { FC, useCallback } from 'react'

import { noop } from '@utils/viewUtils'

import { RepoListProps, SandboxRepoListPage } from '@harnessio/ui/views'

import repoListStore from './repo-list-store.json'

const RepoListWrapper: FC<Partial<RepoListProps>> = props => {
  const useRepoListStore = useCallback(
    () => ({
      ...repoListStore,
      totalItems: 100,
      pageSize: 10,
      setPaginationFromHeaders: (_?: Headers) => {},
      importToastId: '',
      setImportToastId: noop,
      updateRepository: noop,
      setPage: noop,
      setRepositories: noop,
      importRepoIdentifier: null,
      setImportRepoIdentifier: noop,
      addRepository: noop
    }),
    []
  )

  return (
    <>
      <SandboxRepoListPage
        useRepoStore={useRepoListStore}
        isLoading={false}
        isError={false}
        searchQuery=""
        setSearchQuery={noop}
        setQueryPage={noop}
        {...props}
      />
    </>
  )
}

export default RepoListWrapper
