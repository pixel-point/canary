import React from 'react'
import PullRequestList from '../components/pull-request/pull-request-list'
import { Button, ListActions, SearchBox, Spacer } from '@harnessio/canary'
import PaddingListLayout from '../layouts/PaddingListLayout'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

function PullRequestListPage() {
  return (
    <PaddingListLayout>
      <ListActions.Root>
        <ListActions.Left>
          <SearchBox.Root placeholder="Search" />
        </ListActions.Left>
        <ListActions.Right>
          <ListActions.Dropdown title="Filter" items={filterOptions} />
          <ListActions.Dropdown title="Sort" items={sortOptions} />
          <ListActions.Dropdown title="View" items={viewOptions} />
          <Button variant="default">Create Pull Request</Button>
        </ListActions.Right>
      </ListActions.Root>
      <Spacer size={6} />
      <PullRequestList />
    </PaddingListLayout>
  )
}

export default PullRequestListPage
