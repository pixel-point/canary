import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text
} from '@harnessio/canary'
import React from 'react'
import { CommitCopyActions } from '../commit-copy-actions'
import { Link } from 'react-router-dom'
import { Tag } from './interfaces'

interface TagsListProps {
  tags: Tag[]
}

const moreActionsTooltip = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="custom" size="icon" className="text-icons-1 data-[state=open]:text-icons-2">
          <Icon name="vertical-ellipsis" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[12.5rem]" align="end" sideOffset={-6} alignOffset={10}>
        <DropdownMenuGroup>
          <Link
            replace
            // TODO add link to create branch page
            to={`/`}>
            <DropdownMenuItem className="cursor-pointer">Create branch</DropdownMenuItem>
          </Link>
          <Link
            replace
            // TODO add link to view files page
            to={`/`}>
            <DropdownMenuItem className="cursor-pointer">View files</DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer text-foreground-danger">Delete tag</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const RepoTagsList = ({ tags }: TagsListProps) => {
  return (
    <Table variant="asStackedList">
      <TableHeader>
        <TableRow>
          <TableHead>Tag</TableHead>
          <TableHead>Commit</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>
            <></>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map(tag => (
          <TableRow key={tag.id}>
            <TableCell className="content-center w-[40%]">
              <Text>{tag.name}</Text>
            </TableCell>
            <TableCell className="content-center w-[37%]">
              <div className="flex">
                <CommitCopyActions sha={tag.commit} />
              </div>
            </TableCell>
            <TableCell className="content-center w-[23%]">
              <Text wrap="nowrap" truncate className="text-foreground-3">
                {tag.timestamp}
              </Text>
            </TableCell>
            <TableCell className="content-center w-[1%] text-right !pr-1">{moreActionsTooltip()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
