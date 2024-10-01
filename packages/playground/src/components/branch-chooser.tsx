import React from 'react'
import {
  Text,
  Icon,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  cn
} from '@harnessio/canary'

interface BranchListProps {
  name: string
}

interface PageProps {
  name: string
  branchList: BranchListProps[]
  size?: 'default' | 'sm'
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'full'
  selectBranch: (branch: string) => void
}

export const BranchSelector = ({ ...props }: PageProps) => {
  const { name, branchList, size = 'default', selectBranch, width = 'auto' } = props

  const widthClasses: { [key in NonNullable<PageProps['width']>]: string } = {
    auto: 'w-auto',
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-48',
    full: 'w-full'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size={size}
          className={cn(widthClasses[width], 'overflow-hidden flex gap-1.5 items-center px-3 bg-muted')}>
          <Icon name="branch" size={12} className="min-w-[12px] text-tertiary-background" />
          <Text as="p" align="left" className="w-full text-primary/90 truncate">
            {name}
          </Text>
          <Icon name="chevron-down" size={10} className="min-w-[10px] chevron-down ml-0 text-tertiary-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {branchList &&
          branchList.map(branch => {
            return (
              <DropdownMenuItem key={branch.name} onClick={() => selectBranch(branch.name)}>
                {branch.name}
              </DropdownMenuItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
