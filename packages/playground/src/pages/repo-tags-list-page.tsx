import React, { useReducer, useState } from 'react'
import { Button, ListActions, SearchBox, Spacer, Text } from '@harnessio/canary'
import { Link } from 'react-router-dom'
import { PaddingListLayout } from '../layouts/PaddingListLayout'
import { Tag, RepoTagsList } from '../components/repo-tags/repo-tags-list'
import { mockTagsData } from '../data/mockTagsData'
import { SkeletonList } from '../components/loaders/skeleton-list'
import { NoData } from '../components/no-data'
import { PaginationComponent } from '../components/pagination'
import { PlaygroundListSettings } from '../settings/list-settings'
import { NoSearchResults } from '../components/no-search-results'

export default function RepoTagsListPage() {
  const [loadState, setLoadState] = useState('data-loaded')
  // const [dialogState, dispatch] = useReducer(dialogStateReducer, initialDialogState)

  const renderListContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return <RepoTagsList tags={mockTagsData as Tag[]} />
      case 'loading':
        return <SkeletonList />
      case 'no-search-matches':
        return (
          <NoSearchResults
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
          />
        )
      default:
        return <></>
    }
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData
          insideTabView
          iconName="no-data-merge"
          title="No tags yet"
          description={[
            "Your branches will appear here once they're created.",
            'Start branching to see your work organized.'
          ]}
          primaryButton={{ label: 'Create new branch' }}
        />
        <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }

  return (
    <>
      <PaddingListLayout spaceTop={false}>
        <Spacer size={2} />
        <Text size={5} weight={'medium'}>
          Tags
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search" />
          </ListActions.Left>
          <ListActions.Right>
            <Button variant="default" asChild>
              <Link to="create">New tag</Link>
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={6} />
        {loadState === 'data-loaded' && <PaginationComponent totalPages={10} currentPage={5} goToPage={() => {}} />}
      </PaddingListLayout>
      <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}
