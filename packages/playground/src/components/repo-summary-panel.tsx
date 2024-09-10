import React from 'react'
import {
  Text,
  Icon,
  Spacer,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@harnessio/canary'

interface DetailsProps {
  id: string
  iconName: 'tube-sign' | 'open-pr' | 'tag' | 'branch' | string
  name: string
  count: number
}

interface PageProps {
  title: string
  timestamp: string
  details: DetailsProps[]
}

export default function RepoSummaryPanel({ ...props }: PageProps) {
  const { title, timestamp, details } = props

  return (
    <div className="flex flex-col">
      <Spacer size={5} />
      <div className="flex justify-between items-center">
        <Text size={4} weight={'medium'} truncate>
          {title}
        </Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm_icon">
              <Icon name="ellipsis" size={12} className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex gap-1.5 items-center">
              <Icon name="plus" size={12} className="text-tertiary-background" />
              <Text>Add description</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Spacer size={2} />
      <Text size={1} color={'tertiaryBackground'}>
        Created {timestamp}
      </Text>
      <Spacer size={5} />
      <div className="flex flex-col gap-3">
        {details &&
          details.map(item => (
            <div key={item.id} className="flex items-center gap-1.5">
              <Icon name={item.iconName} size={14} className="text-tertiary-background" />
              <Text>{item.name}</Text>
              <Badge variant="outline" size="sm">
                {item.count}
              </Badge>
            </div>
          ))}
      </div>
    </div>
  )
}
