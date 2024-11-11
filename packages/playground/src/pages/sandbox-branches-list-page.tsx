import React, { useState } from 'react'
import { BranchesList } from '../components/branches-list'
import { SkeletonList } from '../components/loaders/skeleton-list'
import { NoData } from '../components/no-data'
import { Button, ListActions, SearchBox, Spacer, Text } from '@harnessio/canary'
import { PaginationComponent } from '../components/pagination'
import PlaygroundBranchesSettings from '../settings/branches-settings'
import { mockBranchData } from '../data/mockBranchData'
import { CreateBranchDialog, SandboxLayout } from '..'
import { noop } from 'lodash-es'
import { BranchProps } from '../types/branch'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

export default function SandboxBranchesListPage() {
  const [loadState, setLoadState] = useState('data-loaded')
  const [isBranchDialogOpen, setBranchDialogOpen] = useState(false)
  const spaceId = 'spaceid'
  const repoId = 'repoId'
  const branch = 'main'
  const renderContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return (
          <BranchesList
            defaultBranch={branch}
            branches={mockBranchData as BranchProps[]}
            spaceId={spaceId}
            repoId={repoId}
          />
        )
      case 'loading':
        return <SkeletonList />

      default:
        return null
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
          primaryButton={{
            label: 'Create new branch',
            onClick: () => {
              setBranchDialogOpen(true)
            }
          }}
        />
        <PlaygroundBranchesSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }
  return (
    <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel>
      <SandboxLayout.Content>
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
            <Button
              variant="default"
              onClick={() => {
                setBranchDialogOpen(true)
              }}>
              Create Branch
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderContent()}
        <Spacer size={8} />
        {loadState === 'data-loaded' && <PaginationComponent totalPages={10} currentPage={5} goToPage={() => {}} />}

        <PlaygroundBranchesSettings loadState={loadState} setLoadState={setLoadState} />
        <CreateBranchDialog
          open={isBranchDialogOpen}
          onClose={() => {
            setBranchDialogOpen(false)
          }}
          branches={mockBranchData}
          onSubmit={noop}
          isSaving={false}
          isLoadingBranches={false}
        />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
