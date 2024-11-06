import React, { useState } from 'react'
import { Button, ListActions, SearchBox, Spacer, Text } from '@harnessio/canary'
import { Link } from 'react-router-dom'
import { PaddingListLayout } from '../layouts/PaddingListLayout'
import { Tag, TagsList } from '../components/tags-list'
import { mockTagsData } from '../data/mockTagsData'
import { SkeletonList } from '../components/loaders/skeleton-list'
import { NoData } from '../components/no-data'
import PlaygroundBranchesSettings from '../settings/branches-settings'
import { PaginationComponent } from '../components/pagination'

export default function RepoTagsListPage() {
  const [loadState, setLoadState] = useState('data-loaded')

  const renderListContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return (
          <TagsList
            tags={mockTagsData as Tag[]}
          />
        )
      case 'loading':
        return <SkeletonList />

      default:
        return <></>
    }
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData
          iconName="no-data-merge"
          title="No branches yet"
          description={[
            "Your branches will appear here once they're created.",
            'Start branching to see your work organized.'
          ]}
          primaryButton={{ label: 'Create new branch' }}
        />
        {/*<PlaygroundBranchesSettings loadState={loadState} setLoadState={setLoadState} />*/}
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
    </>
  )
}
