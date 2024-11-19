import { useState } from 'react'
import { Spacer, ListActions, SearchBox, Button, Text } from '@harnessio/canary'
import { ExecutionList } from '../components/execution-list'
import { PaginationComponent } from '../components/pagination'

import { Link } from 'react-router-dom'
import { SkeletonList } from '../components/loaders/skeleton-list'
import { NoSearchResults } from '../components/no-search-results'
import { NoData } from '../components/no-data'
import { PlaygroundListSettings } from '../settings/list-settings'
import { mockExecutions } from './mocks/execution/mockExecutionList'
import { SandboxLayout } from '..'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

function SandboxRepoExecutionListPage() {
  const [loadState, setLoadState] = useState('data-loaded')

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={`executions/${to}`}>{children}</Link>
  )

  const renderListContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return <ExecutionList executions={mockExecutions} LinkComponent={LinkComponent} />
      case 'loading':
        return <SkeletonList />
      case 'no-search-matches':
        return (
          <NoSearchResults
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
            secondaryButton={{ label: 'Clear filters' }}
          />
        )
      default:
        return null
    }
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData
          insideTabView
          iconName="no-data-folder"
          title="No executions yet"
          description={['There are no executions in this pipeline yet.']}
          primaryButton={{ label: 'Create pipeline' }}
          secondaryButton={{ label: 'Import pipeline' }}
        />
        <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }

  return (
    <>
      <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={2} />
          <Text size={5} weight={'medium'}>
            Executions
          </Text>
          <Spacer size={6} />
          <ListActions.Root>
            <ListActions.Left>
              <SearchBox.Root placeholder="Search executions" />
            </ListActions.Left>
            <ListActions.Right>
              <ListActions.Dropdown title="Filter" items={filterOptions} />
              <ListActions.Dropdown title="Sort" items={sortOptions} />
              <ListActions.Dropdown title="View" items={viewOptions} />
              <Button variant="default" asChild>
                <Link to="edit">Edit Pipeline</Link>
              </Button>
            </ListActions.Right>
          </ListActions.Root>
          <Spacer size={5} />
          {renderListContent()}
          <Spacer size={8} />
          {loadState == 'data-loaded' && <PaginationComponent totalPages={10} currentPage={5} goToPage={() => {}} />}
        </SandboxLayout.Content>
      </SandboxLayout.Main>
      <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export default SandboxRepoExecutionListPage
