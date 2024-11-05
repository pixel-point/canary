import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Spacer, Button, Text } from '@harnessio/canary'
// import { NoSearchResults } from '../components/no-search-results'
import {
  Filter,
  NoData,
  SandboxLayout,
  SkeletonList,
  useCommonFilter,
  WebhooksList,
  NoSearchResults,
  DeleteTokenAlertDialog
} from '@harnessio/playground'
import { useListWebhooksQuery, useDeleteWebhookMutation } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { PaginationComponent } from '../../../../../packages/playground/dist'
import { PageResponseHeader } from '../../types'
export default function RepoSandboxWebhooksListPage() {
  const queryClient = useQueryClient()
  const repoRef = useGetRepoRef()
  const { query: currentQuery } = useCommonFilter()
  const [query, _] = useQueryState('query', { defaultValue: currentQuery || '' })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const [isDeleteWebhookDialogOpen, setIsDeleteWebhookDialogOpen] = useState(false)
  const [deleteWebhookId, setDeleteWebhookId] = useState<string | null>(null)
  const closeDeleteWebhookDialog = () => setIsDeleteWebhookDialogOpen(false)
  const openDeleteWebhookDialog = (id: number) => {
    setIsDeleteWebhookDialogOpen(true)
    setDeleteWebhookId(id.toString())
  }

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

  const { data: { body: webhooks, headers } = {}, isFetching } = useListWebhooksQuery({
    repo_ref: repoRef,
    queryParams: { order: 'asc', page, query }
  })

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  const { mutate: deleteWebhook } = useDeleteWebhookMutation(
    { repo_ref: repoRef, webhook_identifier: 0 },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['listWebhooks', repoRef] })
        closeDeleteWebhookDialog()
      }
    }
  )

  const handleDeleteWebhook = (id: string) => {
    const webhook_identifier = parseInt(id)

    deleteWebhook({ repo_ref: repoRef, webhook_identifier: webhook_identifier })
  }

  const renderListContent = () => {
    if (isFetching) return <SkeletonList />

    if (!webhooks?.length) {
      if (query) {
        return (
          <NoSearchResults
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
            secondaryButton={{ label: 'Clear filters' }}
          />
        )
      }
      return (
        <NoData
          insideTabView
          iconName="no-data-webhooks"
          title="No webhooks yet"
          description={['There are no webhooks in this repository yet.']}
          primaryButton={{ label: 'Create webhook', to: 'create' }}
        />
      )
    }
    return (
      <WebhooksList
        webhooks={webhooks}
        LinkComponent={LinkComponent}
        openDeleteWebhookDialog={openDeleteWebhookDialog}
      />
    )
  }

  const webhooksExist = (webhooks?.length ?? 0) > 0

  return (
    <>
      <SandboxLayout.Main hasHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          {/**
           * Show if webhooks exist.
           * Additionally, show if query(search) is applied.
           */}
          {(query || webhooksExist) && (
            <>
              <Text size={5} weight={'medium'}>
                Webhooks
              </Text>
              <Spacer size={6} />
              <div className="flex justify-between gap-5 items-center">
                <div className="flex-1">
                  <Filter />
                </div>
                <Button variant="default" asChild>
                  <Link to="create">Create webhook</Link>
                </Button>
              </div>
            </>
          )}
          <Spacer size={5} />
          {renderListContent()}
          <Spacer size={8} />
          <PaginationComponent
            totalPages={totalPages}
            currentPage={page}
            goToPage={(pageNum: number) => setPage(pageNum)}
          />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
      <DeleteTokenAlertDialog
        type="webhook"
        open={isDeleteWebhookDialogOpen}
        onClose={closeDeleteWebhookDialog}
        deleteFn={handleDeleteWebhook}
        identifier={deleteWebhookId!}
      />
    </>
  )
}
