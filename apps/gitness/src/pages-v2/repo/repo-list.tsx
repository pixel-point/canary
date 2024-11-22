import { useCallback, useEffect, useMemo, useState } from 'react'

import { parseAsInteger, useQueryState } from 'nuqs'

import { ListReposOkResponse, useListReposQuery } from '@harnessio/code-service-client'
import { RepositoryType, SandboxRepoListPage } from '@harnessio/ui/views'

import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import useSpaceSSE from '../../framework/hooks/useSpaceSSE'
import { useDebouncedQueryState } from '../../hooks/useDebouncedQueryState'
import { timeAgoFromEpochTime } from '../../pages/pipeline-edit/utils/time-utils'
import { PageResponseHeader, SSEEvent } from '../../types'

export default function ReposListPage() {
  const space = useGetSpaceURLParam() ?? ''

  /* Query and Pagination */
  const [query] = useDebouncedQueryState('query')
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [repos, setRepos] = useState<RepositoryType[] | null>(null)

  const { data: { body: repositories, headers } = {}, refetch } = useListReposQuery(
    {
      queryParams: { page, query },
      space_ref: `${space}/+`
    },
    { retry: false }
  )

  useEffect(() => {
    if (repositories) {
      const transformedRepos = repositories.map(repo => ({
        id: repo.id || 0,
        name: repo.identifier || '',
        description: repo.description || '',
        private: !repo.is_public,
        stars: 0,
        forks: repo.num_forks || 0,
        pulls: repo.num_pulls || 0,
        timestamp: repo.updated ? timeAgoFromEpochTime(repo.updated) : '',
        createdAt: repo.created || 0,
        importing: !!repo.importing
      }))
      setRepos(transformedRepos)
    } else {
      setRepos(null)
    }
  }, [repositories])

  const isRepoStillImporting: boolean = useMemo(() => {
    return repositories?.some(repository => repository.importing) ?? false
  }, [repositories])

  const onEvent = useCallback(
    (_eventRepos: ListReposOkResponse) => {
      if (repositories?.some(repository => repository.importing)) {
        refetch()
      }
    },
    [repositories]
  )

  const events = useMemo(() => [SSEEvent.REPO_IMPORTED], [])

  useSpaceSSE({
    space,
    events,
    onEvent,
    shouldRun: isRepoStillImporting
  })

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  return (
    <SandboxRepoListPage
      repositories={repos}
      totalPages={totalPages}
      currentPage={page}
      setPage={(pageNum: number) => setPage(pageNum)}
    />
  )
}
