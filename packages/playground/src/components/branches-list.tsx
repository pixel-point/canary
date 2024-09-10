import { Button, Icon, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@harnessio/canary'
import React from 'react'

interface BranchProps {
  id: string
  name: string
  timestamp: string
  user: {
    name: string
    avatarUrl: string
  }
  checks: {
    done: number
    total: number
    status: number
  }
  behindAhead: {
    behind: number
    ahead: number
  }
  pullRequest: {
    sha: string
    status: string
  }
}

interface PageProps {
  branches: BranchProps[]
}

export default function BranchesList({ branches }: PageProps) {
  return (
    <Table variant="asStackedList">
      <TableHeader>
        <TableRow>
          <TableHead>Branch</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead>Check status</TableHead>
          <TableHead>Behind | Ahead</TableHead>
          <TableHead>Pull request</TableHead>
          <TableHead>
            <></>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {branches &&
          branches.map(branch => {
            return (
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Text wrap="nowrap" truncate className="text-primary/90">
                      <Button variant="secondary" size="xs">
                        <Icon name="branch" size={11} className="text-tertiary-background" />
                        &nbsp;
                        {branch.name}
                      </Button>
                    </Text>
                    <Button variant="ghost" size="xs">
                      <Icon name="clone" size={16} className="text-tertiary-background" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Text wrap="nowrap" truncate className="text-primary">
                    {branch.timestamp}
                  </Text>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 items-center">
                    <Icon name="tick" size={11} className="text-success" />
                    <Text size={2} wrap="nowrap" truncate className="text-tertiary-background">
                      {branch.checks.done} / {branch.checks.total}
                    </Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text wrap="nowrap" truncate className="text-tertiary-background">
                    {branch.behindAhead.behind} | {branch.behindAhead.ahead}
                  </Text>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 items-center">
                    <Icon name="open-pr" size={11} className="text-success" />
                    <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                      #{branch.pullRequest.sha}{' '}
                    </Text>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 items-center justify-end">
                    <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background" />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
