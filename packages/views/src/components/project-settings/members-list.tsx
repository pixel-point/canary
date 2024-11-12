import React from 'react'
import {
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
  Select,
  SelectValue,
  SelectItem,
  SelectTrigger,
  SelectContent
} from '@harnessio/canary'
import { getInitials } from '../../utils/utils'
import { MembersProps } from './interfaces'
import { upperFirst } from 'lodash-es'
import { moreActionsDropdown } from './moreActionsDropdown'
import { transformValue } from './utils'

interface PageProps {
  members: MembersProps[]
  onDelete: (member: MembersProps) => void
  onEdit: (member: MembersProps) => void
}

export const MembersList = ({ members, onDelete, onEdit }: PageProps) => {
  return (
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
          <TableRow key={member.uid}>
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
              <Select
                value={member.role}
                onValueChange={newRole => onEdit({ ...member, role: transformValue(newRole) })}>
                <SelectTrigger className="w-[150px] border-0 justify-start space-x-2" iconClassName="flex-shrink-0">
                  <SelectValue className="flex-1 basis-[70%] grow-0" placeholder="Select Role">
                    {/* //the data from api call is lowerCase */}
                    {upperFirst(member.role)}
                  </SelectValue>
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
              <div className="flex gap-1.5 items-center justify-end">{moreActionsDropdown({ member, onDelete })}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
