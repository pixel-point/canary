import React from 'react'
import { BranchProps } from '../types/branch'
import { Badge, Button, Icon, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@harnessio/canary'
import { Link } from 'react-router-dom'

interface BranchInfoBarProps {
  branches: BranchProps[]
  currentBranch: BranchProps
}

export const BranchInfoBar = ({ branches, currentBranch }: BranchInfoBarProps) => {
  const defaultBranch = branches.find(branch => branch.default)

  return (
    <div className="bg-background-2 px-4 py-1.5 border border-borders-1 rounded-md flex justify-between items-center">
      <div className="flex items-center gap-x-1.5">
        <span className="text-foreground-1 text-14 leading-tight font-light">
          This branch is{' '}
          <Link to={`/sandbox/${currentBranch.name}`}>
            <span className="text-foreground-accent">{currentBranch.behindAhead.ahead} commits ahead of</span>
          </Link>
          ,{' '}
          <Link to={`/sandbox/${currentBranch.name}`}>
            <span className="text-foreground-accent">{currentBranch.behindAhead.behind} commits behind</span>
          </Link>
        </span>
        <Badge className="border-transparent gap-x-1" theme="muted" size="24">
          <Icon className="text-icons-9" name="branch" size={14} />
          <span className="text-foreground-8">{defaultBranch?.name}</span>
        </Badge>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="gap-x-2 data-[state=open]:border-borders-8 [&_svg]:data-[state=open]:text-foreground-1"
            variant="outline"
            size="sm">
            <Icon name="merged" size={14} />
            <span>Contribute</span>
            <Icon className="text-icons-7 chevron-down" name="chevron-down" size={12} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 p-4" align="end">
          <div className="flex gap-x-2">
            <div className="flex-shrink-0 border border-borders-4 rounded-full flex items-center justify-center h-6 w-6">
              <Icon name="merged" size={12} />
            </div>
            <div>
              <span className="text-foreground-1 text-14 leading-snug">
                This branch is {currentBranch.behindAhead.ahead} commits ahead of{' '}
              </span>
              <Badge className="border-transparent gap-x-1" theme="muted" size="24">
                <Icon className="text-icons-9" name="branch" size={14} />
                <span className="text-foreground-8">{defaultBranch?.name}</span>
              </Badge>
              .
              <p className="mt-2.5 text-foreground-4 text-14 leading-tight">
                Open a pull request to contribute your changes upstream.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2.5 mt-4">
            <Button className="w-full" variant="outline" size="sm">
              Compare
            </Button>

            <Button className="w-full" variant="default" size="sm">
              Open pull request
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
