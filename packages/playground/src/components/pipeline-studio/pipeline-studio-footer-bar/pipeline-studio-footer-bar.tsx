import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Icon
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
        'bg-grey-6 text-grey-60 text-tiny flex h-10 shrink-0 items-center justify-between border-t border-[#1d1d20] px-4 font-normal not-italic leading-[15px]'
      }>
      <div className="flex items-center gap-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            props.togglePane?.()
          }}
          className="hover:bg-primary/10 flex h-full cursor-pointer gap-2 rounded-md px-2 py-1.5 duration-150 ease-in-out">
          <div className="flex items-center gap-1.5">
            <Icon name="x-mark" className="text-tertiary-background" />
            <span className="text-tiny text-primary">{props.problems.error}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="x-mark" className="text-tertiary-background" />
            <span className="text-tiny text-primary">{props.problems.warning}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="x-mark" className="text-tertiary-background" />
            <span className="text-tiny text-primary">{props.problems.info}</span>
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
            <span className="text-tiny text-tertiary-background">Branch:</span>
            <Select value={currentBranch} disabled={branchesLoading} onValueChange={onBranchChange}>
<<<<<<< HEAD
              <SelectTrigger className="text-tiny text-primary w-fit border-none px-1 focus:ring-0">
=======
              <SelectTrigger className="text-primary w-fit border-none px-1 text-[12px] focus:ring-0">
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
                <SelectValue placeholder={branchesLoading ? 'Loading...' : 'Select branch'} />
              </SelectTrigger>
              <SelectContent>
                {branches?.map(branch => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {committedTimeAgo && authorName && (
        <Popover>
          <PopoverTrigger>
            <div className="text-tiny text-tertiary-background flex">
              Last edited
              <span className="text-primary">&nbsp;{committedTimeAgo}&nbsp;</span> by
              <span className="text-primary">&nbsp;{authorName}&nbsp;</span>
            </div>
          </PopoverTrigger>
          <PopoverContent side={'top'} className="mb-4 mr-4 w-80 p-0">
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
