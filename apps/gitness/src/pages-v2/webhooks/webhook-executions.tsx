import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useListRepoWebhookExecutionsQuery } from '@harnessio/code-service-client'
import { RepoWebhookExecutionsPage, WebhookExecutionType } from '@harnessio/ui/views'

import { useRoutes } from '../../framework/context/NavigationContext'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import usePaginationQueryStateWithStore from '../../hooks/use-pagination-query-state-with-store'
import { PathParams } from '../../RouteDefinitions'
import { useWebhookStore } from './stores/webhook-store'

export const WebhookExecutionsContainer = () => {
  const repo_ref = useGetRepoRef()
  const routes = useRoutes()
  const { spaceId, repoId, webhookId } = useParams<PathParams>()
  const { webhookExecutionPage, setWebhookExecutionPage, setExecutions, setPaginationFromHeaders } = useWebhookStore()

  const { queryPage } = usePaginationQueryStateWithStore({
    page: webhookExecutionPage,
    setPage: setWebhookExecutionPage
  })

  const { data: { body: executions, headers } = {}, isLoading } = useListRepoWebhookExecutionsQuery(
    {
      repo_ref,
      webhook_identifier: parseInt(webhookId ?? ''),
      queryParams: {
        page: queryPage
      }
    },
    { enabled: !!webhookId }
  )

  useEffect(() => {
    if (executions && headers) {
      setExecutions(executions as WebhookExecutionType[])
      setPaginationFromHeaders(headers)
    }
  }, [executions, setExecutions])

  return (
    <RepoWebhookExecutionsPage
      useWebhookStore={useWebhookStore}
      toRepoWebhooks={() => routes.toRepoWebhooks({ webhookId })}
      repo_ref={repo_ref}
      isLoading={isLoading}
      toRepoWebhookExecutionDetails={(executionId: string) =>
        routes.toRepoWebhookExecutionDetails({ spaceId, repoId, webhookId, executionId })
      }
    />
  )
}
