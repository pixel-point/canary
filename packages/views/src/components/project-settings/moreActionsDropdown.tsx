import React from 'react'
import {
  Icon,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@harnessio/canary'
import { MembersProps } from './interfaces'

interface moreActionsProps {
  member: MembersProps
  onDelete: (member: MembersProps) => void
}

export const moreActionsDropdown = ({ member, onDelete }: moreActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="xs">
          <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="shadow-sm py-2 bg-primary-background border border-gray-800 rounded-[10px] w-[180px]"
        onCloseAutoFocus={event => event.preventDefault()} // Prevent focus on hidden content
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer text-red-400 hover:text-red-400 focus:text-red-400 px-3"
            onSelect={() => onDelete(member)}>
            Remove member
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
