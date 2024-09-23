import React from 'react'
import { Link } from 'react-router-dom'
import { Spacer, ListActions, Button, SearchBox, Text } from '@harnessio/canary'
// import { NoSearchResults } from '../components/no-search-results'
import { NoData, PaddingListLayout, SkeletonList, WebhooksList } from '@harnessio/playground'
import { useListWebhooksQuery } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'

function RepoWebhooksListPage() {
  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>
  const repoRef = useGetRepoRef()
  const { data: webhooks, isFetching } = useListWebhooksQuery({
    repo_ref: repoRef,
    queryParams: { order: 'asc', limit: 20, page: 1 }
  })

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    if (webhooks?.length) {
      return <WebhooksList webhooks={webhooks} LinkComponent={LinkComponent} />
    } else {
      return (
        <NoData
          insideTabView
          iconName="no-data-webhooks"
          title="No webhooks yet"
          description={['There are no webhooks in this repository yet.', 'Create new or import an existing webhook.']}
          primaryButton={{ label: 'Create webhook' }}
          secondaryButton={{ label: 'Import webhook' }}
        />
      )
    }
  }

  return (
    <>
      <PaddingListLayout spaceTop={false}>
        <Spacer size={2} />
        <Text size={5} weight={'medium'}>
          Webhooks
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search webhooks" />
          </ListActions.Left>
          <ListActions.Right>
            <Button variant="default" asChild>
              <Link to="#">Create webhook</Link>
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
      </PaddingListLayout>
    </>
  )
}

export default RepoWebhooksListPage
