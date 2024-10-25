import React from 'react'
import { XmarkCircle, WarningTriangle, InfoCircle } from '@harnessio/icons-noir'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@harnessio/canary'
import { PopoverCommitInfo } from '../popover-commit-info'

interface PipelineStudioFooterBarProps {
  problems: {
    error: number
    warning: number
    info: number
  }
  lastCommitInfo: {
    committedTimeAgo: string
    authorName: string
    authorInitials?: string
    commitSha?: string
    commitMessage?: string
  }
  currentBranch?: string
  branches?: string[]
  branchesLoading: boolean
  onBranchChange: (branch: string) => void
  togglePane?: () => void
}

const PipelineStudioFooterBar: React.FC<PipelineStudioFooterBarProps> = (props: PipelineStudioFooterBarProps) => {
  const { currentBranch, branchesLoading, branches, lastCommitInfo, onBranchChange } = props
  const { committedTimeAgo, authorName, authorInitials, commitSha, commitMessage } = lastCommitInfo

  return (
    <footer
      className={
        'flex items-center justify-between font-normal leading-[15px] px-4 h-10 bg-grey-6 shrink-0 border-border border-t text-grey-60 not-italic border-[#1d1d20] text-[12px]'
      }>
      <div className="flex gap-2 items-center">
        <div
          onClick={() => {
            props.togglePane?.()
          }}
          className="flex gap-2 cursor-pointer hover:bg-primary/10 h-full px-2 py-1.5 rounded-md ease-in-out duration-150">
          <div className="flex items-center gap-1.5">
            <XmarkCircle className="text-tertiary-background" />
            <span className="text-[12px] text-primary">{props.problems.error}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <WarningTriangle className="text-tertiary-background" />
            <span className="text-[12px] text-primary">{props.problems.warning}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <InfoCircle className="text-tertiary-background" />
            <span className="text-[12px] text-primary">{props.problems.info}</span>
          </div>
        </div>
        <div className={'flex gap-2'}>
          {/* <div className="flex gap-1 items-center">
            <span className="text-tertiary-background text-[12px]">Repository:</span>
            <Select defaultValue="harness-next">
              <SelectTrigger className="w-fit border-none px-1 text-primary text-[12px] focus:ring-[0px]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="harness-next">harness-next</SelectItem>
                <SelectItem value="canary">canary</SelectItem>
                <SelectItem value="devops">devops</SelectItem>
                <SelectItem value="unscripted">unscripted</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <div className={'flex items-baseline'}>
            <span className="text-tertiary-background text-[12px]">Branch:</span>
            <Select value={currentBranch} disabled={branchesLoading} onValueChange={onBranchChange}>
              <SelectTrigger className="w-fit border-none px-1 text-primary text-[12px] focus:ring-[0px]">
                <SelectValue placeholder={branchesLoading ? 'Loading...' : 'Select branch'} />
              </SelectTrigger>
              <SelectContent>{branches?.map(branch => <SelectItem value={branch}>{branch}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {committedTimeAgo && authorName && (
        <Popover>
          <PopoverTrigger>
            <div className="flex text-[12px] text-tertiary-background">
              Last edited
              <span className="text-primary">&nbsp;{committedTimeAgo}&nbsp;</span> by
              <span className="text-primary">&nbsp;{authorName}&nbsp;</span>
            </div>
          </PopoverTrigger>
          <PopoverContent side={'top'} className="w-80 mb-4 mr-4 p-0">
            <PopoverCommitInfo.Root>
              <PopoverCommitInfo.CommitInfo authorName={authorName} initials={authorInitials} commit={commitSha} />
              <PopoverCommitInfo.CommitMessage>{commitMessage}</PopoverCommitInfo.CommitMessage>
            </PopoverCommitInfo.Root>
          </PopoverContent>
        </Popover>
      )}
    </footer>
  )
}

export { PipelineStudioFooterBar }
