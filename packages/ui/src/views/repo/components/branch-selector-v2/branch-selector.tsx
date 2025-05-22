import { FC } from 'react'

import { Button, DropdownMenu, Icon, type ButtonSizes } from '@/components'
import { BranchData, BranchSelectorListItem, BranchSelectorTab } from '@/views'

import { BranchSelectorDropdown } from './branch-selector-dropdown'

interface BranchSelectorProps {
  branchList: BranchData[]
  tagList: BranchSelectorListItem[]
  selectedBranchorTag: BranchSelectorListItem
  repoId: string
  spaceId: string
  branchPrefix?: string
  buttonSize?: ButtonSizes
  selectedBranch?: BranchSelectorListItem
  onSelectBranch: (branchTag: BranchSelectorListItem, type: BranchSelectorTab) => void
  isBranchOnly?: boolean
  searchQuery?: string
  setSearchQuery: (query: string) => void
  dynamicWidth?: boolean
  preSelectedTab?: BranchSelectorTab
  isFilesPage?: boolean
  setCreateBranchDialogOpen?: (open: boolean) => void
}
export const BranchSelectorV2: FC<BranchSelectorProps> = ({
  repoId,
  spaceId,
  branchList,
  tagList,
  selectedBranchorTag,
  branchPrefix,
  buttonSize,
  selectedBranch,
  onSelectBranch,
  isBranchOnly = false,
  searchQuery = '',
  setSearchQuery,
  dynamicWidth = false,
  preSelectedTab,
  isFilesPage = false,
  setCreateBranchDialogOpen
}) => {
  const isTag = selectedBranchorTag
    ? tagList?.some(tag => tag.name === selectedBranchorTag.name && tag.sha === selectedBranchorTag.sha)
    : false

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {/* TODO: Design system: Add max-width from tailwind config and add .truncate to span */}
        <Button className="justify-start px-3" variant="outline" size={buttonSize}>
          {!branchPrefix && <Icon className="shrink-0 fill-transparent" name={isTag ? 'tag' : 'branch'} size={14} />}
          <span className="text-ellipsis whitespace-nowrap">
            {branchPrefix
              ? `${branchPrefix}: ${selectedBranch?.name || selectedBranchorTag.name}`
              : selectedBranch?.name || selectedBranchorTag.name}
          </span>
          <Icon name="chevron-down" className="chevron-down ml-auto shrink-0" size={12} />
        </Button>
      </DropdownMenu.Trigger>
      <BranchSelectorDropdown
        isBranchOnly={isBranchOnly}
        branchList={branchList}
        tagList={tagList}
        onSelectBranch={onSelectBranch}
        selectedBranch={selectedBranch || selectedBranchorTag}
        repoId={repoId}
        spaceId={spaceId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dynamicWidth={dynamicWidth}
        preSelectedTab={preSelectedTab}
        isFilesPage={isFilesPage}
        setCreateBranchDialogOpen={setCreateBranchDialogOpen}
      />
    </DropdownMenu.Root>
  )
}
