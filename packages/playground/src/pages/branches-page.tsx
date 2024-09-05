import React, { useState } from 'react'
import BranchesList from '../components/branches'
import SkeletonList from '../components/loaders/skeleton-list'
import NoData from '../components/no-data'
import PaddingListLayout from '../layouts/PaddingListLayout'
import { ListActions, SearchBox, Spacer, Text } from '@harnessio/canary'
import PlaygroundBranchesSettings from '../settings/branches-settings'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

export default function BranchesListPage() {
  const [loadState, setLoadState] = useState('loading')

  const renderContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return <BranchesList />
      case 'loading':
        return <SkeletonList />

      default:
        return null
    }
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData iconName="no-data-folder" title="No branches yet" description={['There are no branches yet.']} />
        <PlaygroundBranchesSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }
  return (
    <PaddingListLayout spaceTop={false}>
      <Spacer size={2} />
      <Text size={5} weight={'medium'}>
        Branches
      </Text>
      <Spacer size={6} />
      <ListActions.Root>
        <ListActions.Left>
          <SearchBox.Root placeholder="Search branches" />
        </ListActions.Left>
        <ListActions.Right>
          <ListActions.Dropdown title="Filter" items={filterOptions} />
          <ListActions.Dropdown title="Sort" items={sortOptions} />
        </ListActions.Right>
      </ListActions.Root>
      <Spacer size={5} />
      {renderContent()}
      <PlaygroundBranchesSettings loadState={loadState} setLoadState={setLoadState} />
    </PaddingListLayout>
  )
}
