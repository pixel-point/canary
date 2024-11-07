import React from 'react'
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Select,
  SelectValue,
  SelectItem,
  SelectTrigger,
  SelectContent
} from '@harnessio/canary'
import { getInitials } from '../../utils/utils'
import { MembersProps } from './interfaces'

interface PageProps {
  members: MembersProps[]
  onDelete: (member: MembersProps) => void
  onEdit: (member: MembersProps) => void
}

export const MembersList = ({ members, onDelete, onEdit }: PageProps) => {
  //TODO: migrate actions component
  const moreActionsTooltip = ({ member }: { member: MembersProps }) => {
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
            <DropdownMenuItem className="cursor-pointer" onSelect={() => onEdit(member)}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="edit-pen" className="mr-2" />
              </DropdownMenuShortcut>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:text-red-400 focus:text-red-400"
              onSelect={() => onDelete(member)}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="trash" className="mr-2 text-red-400" />
              </DropdownMenuShortcut>
              Remove member
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Table variant="asStackedList">
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary">Name</TableHead>
            <TableHead className="text-primary">Email</TableHead>
            <TableHead className="text-primary">Role</TableHead>
            <TableHead>
              <></>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map(member => (
            <TableRow key={member.email}>
              {/* NAME */}
              <TableCell className="content-center my-6">
                <div className="flex items-center gap-4">
                  <Avatar size="10">
                    {member.avatarUrl && <AvatarImage src={member.avatarUrl} />}
                    <AvatarFallback className="text-xs p-1 text-center">
                      {getInitials(member.display_name, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Text size={2} weight="medium" wrap="nowrap" truncate className="text-primary">
                    {member.display_name}
                  </Text>
                </div>
              </TableCell>
              {/* EMAIL */}
              <TableCell className="content-center my-6">
                <div className="flex gap-1.5">
                  <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                    {member.email}
                  </Text>
                </div>
              </TableCell>
              {/* ROLE */}
              <TableCell className="content-center my-6">
                <Select defaultValue={member.role} onValueChange={newRole => onEdit({ ...member, role: newRole })}>
                  <SelectTrigger className="w-[150px] border-0 justify-start" iconClassName="flex-shrink-0">
                    <SelectValue className="flex-1 basis-[70%] grow-0" placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="w-[300px]">
                    <SelectItem value="Owner">
                      <Text className="text-left inline-block w-full">Owner</Text>
                      <Text className="text-muted-foreground inline-block w-full mt-1.5">
                        Admin-level access to all resources.
                      </Text>
                    </SelectItem>
                    <SelectItem value="Contributor">
                      <Text className="text-left inline-block w-full">Contributor</Text>
                      <Text className="text-muted-foreground inline-block w-full mt-1.5">
                        Can view, comment, and edit resources.
                      </Text>
                    </SelectItem>
                    <SelectItem value="Reader">
                      <Text className="text-left inline-block w-full">Reader</Text>
                      <Text className="text-muted-foreground inline-block w-full mt-1.5">Can view and comment.</Text>
                    </SelectItem>
                    <SelectItem value="Executor">
                      <Text className="text-left inline-block w-full">Executor</Text>
                      <Text className="text-muted-foreground inline-block w-full mt-1.5">
                        Can view but cannot make changes or leave comments.
                      </Text>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="content-center my-6">
                <div className="flex gap-1.5 items-center justify-end">{moreActionsTooltip({ member })}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
